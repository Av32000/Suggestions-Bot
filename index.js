const { Intents, Client, Constants } = require('discord.js')
const dotenv = require('dotenv')

dotenv.config()

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ]
})

client.on('ready', () => {
  client.guilds.cache.forEach(element => {
    let guildID = element.id;
    let guild = client.guilds.cache.get(guildID)
    let commands

    if (guild) {
      commands = guild.commands
    } else {
      commands = client.application.commands
    }

    commands?.create({
      name: "setup",
      description: "Permet de verifier la configuration du bot",
      usage: "setup",
      options: [
        {
          name: "channel",
          description: "Le salon des suggestions",
          type: Constants.ApplicationCommandOptionTypes.CHANNEL,
          required: false
        }
      ]
    })

    commands?.create({
      name: "suggestion",
      description: "Permet de faire une suggestion",
      usage: "suggestion <suggestion>",
      options: [
        {
          name: "suggestion",
          description: "Votre suggestion",
          type: Constants.ApplicationCommandOptionTypes.STRING,
          required: true
        }
      ]
    })

    commands?.create({
      name: "accept",
      description: "Permet de valider une suggestion",
      usage: "accept <suggestion>",
      options: [
        {
          name: "suggestion",
          description: "L'id du message de la suggestion",
          type: Constants.ApplicationCommandOptionTypes.STRING,
          required: true
        }
      ]
    })

    commands?.create({
      name: "refuse",
      description: "Permet de refuser une suggestion",
      usage: "refuse <suggestion>",
      options: [
        {
          name: "suggestion",
          description: "L'id du message de la suggestion",
          type: Constants.ApplicationCommandOptionTypes.STRING,
          required: true
        }
      ]
    })

    commands?.create({
      name: "comment",
      description: "Permet de faire un commentaire sur une suggestion",
      usage: "comment <suggestion> <comment>",
      options: [
        {
          name: "suggestion",
          description: "Votre suggestion",
          type: Constants.ApplicationCommandOptionTypes.STRING,
          required: true
        },
        {
          name: "comment",
          description: "Votre commentaire",
          type: Constants.ApplicationCommandOptionTypes.STRING,
          required: true
        }
      ]
    })

  });

  client.user.setActivity({
    name: 'regarder vos suggestions',
    type: "Playing"
  });

  client.user.setUsername('SuggestionBot');

  console.log("The bot is ready !")
})

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    const { commandName, options } = interaction

    if (commandName == "setup") {
      let file = require('./commands/setup')
      let instance = new file
      instance.exec(interaction, options.getChannel('channel'));
    } else if (commandName == "suggestion") {
      let file = require('./commands/suggestion')
      let instance = new file
      instance.exec(interaction, options.getString('suggestion'));
    } else if (commandName == "accept") {
      let file = require('./commands/accept')
      let instance = new file
      instance.exec(interaction, options.getString('suggestion'));
    } else if (commandName == "refuse") {
      let file = require('./commands/refuse')
      let instance = new file
      instance.exec(interaction, options.getString('suggestion'));
    } else if (commandName == "comment") {
      let file = require('./commands/comment')
      let instance = new file
      instance.exec(interaction, options.getString('suggestion'), options.getString('comment'));
    }
  }
})

client.login(process.env.TOKEN)