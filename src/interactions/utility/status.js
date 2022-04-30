// Ping cmd
const config = require("../../../config.json")
const {MessageEmbed} = require("discord.js")

module.exports = {
    command: "status",
    name: "Status",
    category: "status",
    description: "Status",
    run: async (client, interaction) => {
        interaction.reply({ content: 'Pong' })
    }
}