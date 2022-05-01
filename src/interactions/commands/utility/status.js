// Status interaction
module.exports = {
    command: "status",
    name: "Status",
    category: "status",
    description: "Status",
    run: async (client, interaction) => {
        interaction.reply({ content: `**Command Latency:** ${interaction.createdTimestamp - new Date().getTime()}ms\n**API Latency:** ${client.ws.ping}ms` })
    }
}