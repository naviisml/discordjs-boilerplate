const { SlashCommandBuilder } = require('@discordjs/builders')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { clientId, token } = require('../config.json')
const { readdirSync } = require('fs')
const ascii = require('ascii-table')
const path = require('path')

// define the command folders
const folders = ["utility", "community"]

// Initializing the table
const table = new ascii("Interactions")
table.setHeading("Interaction", "Load Status")

// define the slash commands
const slashCommands = []

// define the required command parameters
const parameters = [
	"name", "command", "description", "category"
]

// Lets get all the subfolders of the "commands" folder
folders.forEach(dir => {
	const commands = readdirSync(path.join(__dirname, `../src/interactions/commands/${dir}/`)).filter(d => d.endsWith(".js"))

	for (let file of commands) {
		// Now, we will get every command from every subfolder
		let command = require(`../src/interactions/commands/${dir}/${file}`)
		let status = true

		// We check if the command has a proper configuration
		for (var i = 0; i < parameters.length; i++) {
			if (!command[parameters[i]]) {
				// If the command doesn't have a valid configuration, add another row showing the error
				table.addRow(file, `❌ --> ${file} is missing [${parameters[i]}] parameter`)
				status = false
			}
		}

		if (status == true) {
			// If it does, add a row to the table and finally set the command
			table.addRow(file, '✔️')
			
			let slashCommand = new SlashCommandBuilder()
				.setName(command.command)
				.setDescription(command.description)

			// execute callback from file with button
			if (typeof command.build == 'function') {
				slashCommand = command.build(slashCommand)
			}

			// add command to table
			slashCommands.push(slashCommand)
		}
	}
})

const rest = new REST({ version: '9' }).setToken(token)

// register the commands
rest.put(Routes.applicationCommands(clientId), { body: slashCommands.map(command => command.toJSON()) })
	.then(() => console.log('Successfully registered application interactions.'))
	.catch(console.error)

console.log(table.toString())
