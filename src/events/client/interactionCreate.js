// Get the config.json file for the prefix
const config = require("../../../config.json")

module.exports = async (client, interaction) => {
    // First, we check if the interaction is a command, or if the `slashCommands` variable
	// is set to false.
    // If it does, we end the event
	if (!interaction.isCommand() || config.slashCommands == false) return

    // Now we define the arguments and the cmd
	const { commandName } = interaction

    // we define the command file
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