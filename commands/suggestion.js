const { MessageEmbed } = require('discord.js');
const JSON = require('jsonfile')

class Command {
  async exec(interaction, suggestion, path) {
    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
      return interaction.reply({
        embeds: [new MessageEmbed()
          .setColor('#ff0000')
          .setTitle('Vous n\'avez pas la permission d\'utiliser cette commande')
        ]
      })
    }
    let guildID = interaction.guild.id;
    const servers = JSON.readFileSync(path);

    if (servers[guildID] === undefined || servers[guildID] === null) {
      return interaction.reply({
        embeds: [new MessageEmbed()
          .setColor('#ff0000')
          .setTitle('Veuillez configurer le serveur avec la comande /setup')
        ]
      })
    } else {
      const channelId = servers[guildID].channel;
      const channel = interaction.guild.channels.cache.get(channelId);

      if (channel == null) {
        return interaction.reply({
          embeds: [new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Veuillez configurer le serveur avec la comande /setup')
          ]
        })
      }

      channel.send({
        embeds: [new MessageEmbed()
          .setColor('#ff7700')
          .setTitle("Suggestion de " + interaction.user.tag)
          .setDescription(suggestion)
        ]
      }).then(message => {
        message.react('✅');
        message.react('❌');
      })

      interaction.reply({
        embeds: [new MessageEmbed()
          .setColor('#00ff37')
          .setTitle('Votre suggestion a bien été envoyée')
        ]
      })
    }

  }
}
module.exports = Command