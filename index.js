const { Intents, Client, Constants } = require('discord.js')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

dotenv.config()

let serversPath = path.join(__dirname, 'servers.json');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ]
})

client.on("guildCreate", guild => {
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

  commands?.create({
    name: "help",
    description: "Affiche la liste des commandes",
    usage: "help",
  })

  console.log(`Joined guild ${guild.name}`)
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

    commands?.create({
      name: "help",
      description: "Affiche la liste des commandes",
      usage: "help",
    })

  });

  client.user.setActivity({
    name: 'regarder vos suggestions',
    type: "Playing"
  });

  client.user.setUsername('SuggestionBot');

  if (fs.existsSync(path)) {
    console.log("Creating servers.json file");
    fs.appendFileSync(serversPath, '{1:1}');
  }

  console.log("The bot is ready !")
})

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    const { commandName, options } = interaction

    if (commandName == "setup") {
      let file = require('./commands/setup')
      let instance = new file
      instance.exec(interaction, options.getChannel('channel'), serversPath);
    } else if (commandName == "suggestion") {
      let file = require('./commands/suggestion')
      let instance = new file
      instance.exec(interaction, options.getString('suggestion'), serversPath);
    } else if (commandName == "accept") {
      let file = require('./commands/accept')
      let instance = new file
      instance.exec(interaction, options.getString('suggestion'), serversPath);
    } else if (commandName == "refuse") {
      let file = require('./commands/refuse')
      let instance = new file
      instance.exec(interaction, options.getString('suggestion'), serversPath);
    } else if (commandName == "comment") {
      let file = require('./commands/comment')
      let instance = new file
      instance.exec(interaction, options.getString('suggestion'), options.getString('comment'), serversPath);
    } else if (commandName == "help") {
      let file = require('./commands/help')
      let instance = new file
      instance.exec(interaction, serversPath);
    }
  }
})

client.login(process.env.TOKEN)