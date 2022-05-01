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

// Lets get all the subfolders of the "commands" folder
folders.forEach(dir => {
	const commands = readdirSync(path.join(__dirname, `../src/interactions/commands/${dir}/`)).filter(d => d.endsWith(".js"))

	for (let file of commands) {
		// Now, we will get every command from every subfolder
		let command = require(`../src/interactions/commands/${dir}/${file}`)

		// We check if the command has a configuration
		if(command.name) {
			// If it does, add a row to the table and finally set the command
			table.addRow(file, '✔️')

			let slashCommand = new SlashCommandBuilder()
				.setName(command.command)
				.setDescription(command.description)

			// execute callback from file with button
			if (typeof command.build == 'function') {
				command.build(slashCommand)
			}
			
			// add command to table
			slashCommands.push(slashCommand)
		} else {
			// If the command doesn't have a valid configuration, add another row showing the error
			table.addRow(file, `❌ --> Missing ${file}.name or ${file}.name is not a string`)
			continue
		}
	}
})

const rest = new REST({ version: '9' }).setToken(token)

// register the commands
rest.put(Routes.applicationCommands(clientId), { body: slashCommands.map(command => command.toJSON()) })
	.then(() => console.log('Successfully registered application interactions.'))
	.catch(console.error)

console.log(table.toString())
