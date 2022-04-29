// Now, this is literally the most important event. Keep track of everything i say.

// Get the config.json file for the prefix
const config = require("../../../config.json")

module.exports = async (interaction) => {
    // First, we check if the interaction is a command
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

    // Now we check if the command starts with the PREFIX
    // If it doesn't, stop the command's execution
    if(!message.content.startsWith(prefix)) return;

    // we define the command file
    let cmdfile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
    
    // if the commandfile exists, execute the command
    if(cmdfile) {
        // Try to execute it, if it catchs an error, console.log it
        try {
            cmdfile.run(client, message, args)
            console.debug(`User [${message.author.username}] executed command [${message.content}]`)
        } catch(error) {
            console.error(error)
        }
    }
}