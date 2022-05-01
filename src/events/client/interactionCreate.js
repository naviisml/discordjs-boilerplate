// Get the config.json file for the prefix
const config = require("../../../config.json")

module.exports = async (client, interaction) => {
    // First, we check if the `slashCommands` config variable is set to false.
    // If it does, we end the event
	if (config.slashCommands == false) return

    // Check if the interaction is a command
    if (interaction.isCommand()) {
        // Define the arguments and the cmd
        const { commandName } = interaction

        // Define the command file
        let cmdfile = client.interactions.get(commandName) || client.interactions.get(client.aliases.get(commandName))
        
        // if the commandfile exists, execute the command
        if(cmdfile) {
            // Try to execute it, if it catchs an error, console.log it
            try {
                cmdfile.run(client, interaction)
                console.debug(`User [${interaction.user.username}] triggered interaction [/${commandName}]`)
            } catch(error) {
                console.error(error)
            }
        }
    }

    // Otherwise, check if the interaction is a button click
    if (interaction.isButton()) {
        // Define the arguments and the cmd
        const { customId } = interaction

        // Define the command file
        let cmdfile = client.buttons.get(customId) || client.buttons.get(client.aliases.get(customId))
        
        // if the commandfile exists, execute the command
        if(cmdfile) {
            // Try to execute it, if it catchs an error, console.log it
            try {
                cmdfile.run(client, interaction)
                console.debug(`User [${interaction.user.username}] triggered button [${customId}]`)
            } catch(error) {
                console.error(error)
            }
        }
    }
}