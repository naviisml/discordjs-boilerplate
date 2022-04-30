// Ping cmd
const config = require("../../../config.json")
const {MessageEmbed} = require("discord.js")

module.exports = {
    command: "ping",
    name: "Ping",
    category: "ping",
    description: "Ping",
    run: async (client, interaction) => {
        interaction.reply({ content: 'Pong' })
    }
}