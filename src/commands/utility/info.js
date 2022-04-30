// Ping cmd
const config = require("../../../config.json")
const {MessageEmbed} = require("discord.js")

module.exports = {
    name: "Info",
    description: "Shows some information about the bot.",
    category: "utility",
    usage: "info",
    command: "info",
    accessible: "Members",
    run: async (client, message) => {
        // We need to get the prefix too.
        const prefix = config.prefix

        let embed = new MessageEmbed()
            .setTitle(`Info`)
            .addField('Website', `${config.website}`)
            .addField('Command Latency', `${message.createdTimestamp - new Date().getTime()}ms`)
            .addField('API Latency', `${client.ws.ping}ms`)
            .setColor("#3498DB")
        
        // And finally we return the embed
        return message.channel.send(embed)
    }
}