// Ping cmd
const config = require("../../../config.json")
const {MessageEmbed} = require("discord.js")

module.exports = {
    command: "ping",
    name: "Ping",
    category: "utility",
    description: "Pong! Shows client and api latency",
    usage: "ping",
    acessible: "Members",
    aliases: [""],
    run: async (client, message) => {
        // We need to get the prefix too.
        const prefix = config.prefix

        let embed = new MessageEmbed()
            .setTitle(`List of available commands (${client.commands.size})`)
            .setColor("#3498DB")
            .setFooter(`Do ${prefix} help (command) for getting more information`)


        embed.addField('Command Latency', message.createdTimestamp - new Date().getTime())
        embed.addField('API Latency', client.ws.ping)
        
        // And finally we return the embed
        message.author.send(embed)
    }
}