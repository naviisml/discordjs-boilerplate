// Get the config.json file for the prefix
const config = require("../../../config.json")

// Simply send a message to the console when the bot is online
module.exports = client => {
    // sets the bots username
    client.user.setUsername(config.name)
    
    // sets the bots status
    client.user.setActivity(config.status, {
        type: 'PLAYING',
        url: config.website
    });

    console.info("Bot [" + client.user.username + "] is online!")
}