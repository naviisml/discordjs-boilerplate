require('./utilities/console')

// This will check if the node version you are running is the required
// Node version or higher, if it isn't it will throw the following error to inform you.
if (Number(process.version.slice(1).split(".")[0]) < 12) throw new Error("Node 12.0.0 or higher is required. You need to update your Node.js to the required release, or a newer one.");

// First, we require discord.js's Client and Collection constructors
const { Client, Collection } = require("discord.js")

// Now, we initialize a new discord.js Client
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

// Now, we need to require fs (FileSystem) for assigning commands, events, etc...
const fs = require('fs')

// Next, require our config.json file containing the bot's token 
const config = require("../config.json")

// create the collections for the bot
const collections = ["interactions", "buttons", "aliases", "commands"]

collections.forEach(name => {
    console.debug(`Created [${name}] collection`)

    client[name] = new Collection()
})

// Loading handlers
const handlers = ["interactions", "command", "event"]

handlers.forEach(handler => {
    console.debug(`Loading [${handler}] handler`)

    require(`./handlers/${handler}`)(client)
})

// Finally, we login and set an activity
client.login(config.token)
