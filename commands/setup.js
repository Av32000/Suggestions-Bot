const { MessageEmbed } = require('discord.js')
const JSON = require('jsonfile')

class Command {
  async exec(interaction, channel, path) {
    if (interaction.member.permissions.has('ADMINISTRATOR')) {
      let guildID = interaction.guild.id;
      const servers = JSON.readFileSync(path);

      if (servers[guildID] === undefined || servers[guildID] === null) {
        if (channel == null || channel == undefined) {
          return interaction.reply({
            embeds: [new MessageEmbed()
              .setColor('#ff0000')
              .setTitle('Veuillez spécifier un salon de suggestion')
            ]
          })
        }

        servers[guildID] = { channel: channel.id };

        JSON.writeFile(path, servers, function (err) {
          if (err) console.error(err)
        })

        interaction.reply({
          embeds: [new MessageEmbed()
            .setColor('#00ff37')
            .setTitle('Le bot est désormais configuré pour ce serveur')
            .setDescription('Vous pouvez utiliser la commande `setup` pour changer les paramètres')]
        })
      } else {
        if (channel == null) {
          interaction.reply({
            embeds: [new MessageEmbed()
              .setColor('#0099ff')
              .setTitle('Le bot est déjà configuré pour ce serveur')
              .setDescription('Vous pouvez utiliser la commande `setup` pour changer les paramètres')
            ]
          })
        } else {
          servers[guildID] = { channel: channel.id };

          JSON.writeFile(path, servers, function (err) {
            if (err) console.error(err)
          })

          interaction.reply({
            embeds: [new MessageEmbed()
              .setColor('#00ff37')
              .setTitle('Le bot est désormais configuré pour ce serveur')
              .setDescription('Vous pouvez utiliser la commande `setup` pour changer les paramètres')
            ]
          })
        }
      }
    } else {
      interaction.reply({
        embeds: [new MessageEmbed()
          .setColor('#ff0000')
          .setTitle('Vous n\'avez pas la permission d\'utiliser cette commande')
        ]
      })
    }
  }
}
module.exports = Command