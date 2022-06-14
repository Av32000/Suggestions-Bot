const { MessageEmbed } = require('discord.js');
const JSON = require('jsonfile')

class Command {
  async exec(interaction, suggestion, path) {
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

          let title = lastEmbed.title.split("-")[0] + "- Refusée";

          let embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle(title)
            .setDescription(lastEmbed.description)
            .addFields(lastEmbed.fields)

          message.edit({ embeds: [embed] });

          interaction.reply({
            embeds: [new MessageEmbed()
              .setColor('#00ff55')
              .setTitle('La suggestion a bien été refusée')
            ]
          })

        }

      });
    }
  }
}
module.exports = Command