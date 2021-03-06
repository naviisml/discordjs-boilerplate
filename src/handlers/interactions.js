// Command Handler. We start reqiring fs, ascii tables and path
const { readdirSync } = require('fs')
const ascii = require('ascii-table')
const path = require('path')

// the command folders
const commands = ["utility"]

// the button folders
const buttons = ["utility"]

// Initializing the table
let table = new ascii("Interactions")
table.setHeading("Interaction", "Load Status")

// Now, we will really work with the command handler
module.exports = client => {
    // Lets get all the subfolders of the "commands" folder
    const load = (dir, collection) => {
        const interactions = readdirSync(path.join(__dirname, `../${dir}/`)).filter(d => d.endsWith(".js"))

        for (let file of interactions) {
            // Now, we will get every command from every subfolder
            let pull = require(`../${dir}/${file}`)
            
            // We check if the command has a configuration
            if(pull.name) {
                // If it does, add a row to the table and finally set the command
                table.addRow(file, '✔️')
                collection.set(pull.command, pull)
            } else {
                // If the command doesn't have a valid configuration, add another row showing the error
                table.addRow(file, `❌ --> Missing ${file}.name or ${file}.name is not a string`)
                continue
            }

            // Now we will check for existing aliases in the command's config
            if (pull.aliases) {
                // For each one, set a command too
                pull.aliases.forEach(a => client.aliases.set(a, pull.command))
            }
        }
    }
    
    table = new ascii("Interactions")
    table.setHeading("Interaction", "Load Status")

    // For each folder of interactions you have, add its name to this array
    commands.forEach(c => load(`interactions/commands/${c}`, client.interactions))
    
    // Now log the table
    console.log(table.toString())

    table = new ascii("Buttons")
    table.setHeading("Interaction", "Load Status")

    // Load the buttons
    buttons.forEach(c => load(`interactions/buttons/${c}`, client.buttons))
    
    // Now log the table
    console.log(table.toString())
}