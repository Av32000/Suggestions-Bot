const { MessageEmbed } = require('discord.js');
const JSON = require('jsonfile')

class Command {
  async exec(interaction, path) {
    let config = false;

    let guildID = interaction.guild.id;
    const servers = JSON.readFileSync(path);

    if (servers[guildID] === undefined || servers[guildID] === null) {
      config = false;
    } else {
      config = true;
    }

    let embed = new MessageEmbed()
      .setColor('#00ff37')
      .setTitle('Suggestion - Help')
      .setDescription('Le bot Suggestion permet aux membres de faire des suggestions.\nLes suggestions sont alors envoyées dans le salon de suggestion configurer pour le bot où les membres peuvent voter pour ou contre les différentes suggestions.\nVous pouvez ensuite commenter, valider ou refuser une suggestion.')
      .addField('Commandes', '/suggestion <suggestion>\n/accept <suggestion>\n/refuse <suggestion>\n/setup <channel>\n/comment <suggestion> <comment>\n/help', true)
      .addField("Liens", "Github : https://github.com/Av32000/Suggestions-Bot", true)
      .setFooter('Demandé par ' + interaction.user.username, interaction.user.displayAvatarURL())
      .setThumbnail(interaction.client.user.displayAvatarURL())

    if (!config) {
      embed.addField('Configuration', "❌ Le bot n'a pas été configuré pour ce serveur.\nVous pouvez utiliser la commande `setup` pour configurer le bot. ❌")
    } else {
      embed.addField('Configuration', "✅ Le bot est configuré pour ce serveur.\nVous pouvez utiliser la commande `setup` pour changer les paramètres. ✅")
    }

    interaction.reply({
      embeds: [embed]
    })
  }
}
module.exports = Command