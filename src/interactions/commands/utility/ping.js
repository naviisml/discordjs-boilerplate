// Ping interaction
module.exports = {
    command: "ping",
    name: "Ping",
    category: "ping",
    description: "Ping",
    run: async (client, interaction) => {
        interaction.reply({ content: 'Pong', ephemeral: true })
    },
    build(command) {
        return command.addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the person to ping')
                .setRequired(true)
        );
    }
}