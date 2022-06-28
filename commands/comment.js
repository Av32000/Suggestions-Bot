const { MessageEmbed } = require('discord.js');
const JSON = require('jsonfile')

class Command {
  async exec(interaction, suggestion, comment, path) {
    let guildID = interaction.guild.id;
    const servers = JSON.readFileSync(path);
    if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
      return interaction.reply({
        embeds: [new MessageEmbed()
          .setColor('#ff0000')
          .setTitle('Vous n\'avez pas la permission d\'utiliser cette commande. Nécessite : MANAGE_MESSAGES')
        ]
      })
    }
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

      channel.messages.fetch(`${suggestion}`).then(message => {
        if (message == null) {
          return interaction.reply({
            embeds: [new MessageEmbed()
              .setColor('#ff0000')
              .setTitle('Cette suggestion n\'existe pas')
            ]
          })
        } else {
          let lastEmbed = message.embeds[0];

          let embed = new MessageEmbed()
            .setColor(lastEmbed.color)
            .setTitle(lastEmbed.title)
            .setDescription(lastEmbed.description)
            .addFields(lastEmbed.fields)
            .addField('Commentaire de ' + interaction.user.tag, comment)

          message.edit({ embeds: [embed] });

          interaction.reply({
            embeds: [new MessageEmbed()
              .setColor('#00ff55')
              .setTitle('Le commentaire a bien été ajouté')
            ]
          })

        }

      }).catch(console.error);
    }
  }
}
module.exports = Command