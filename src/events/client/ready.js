// Simply send a message to the console when the bot is online
module.exports = client => {
    client.user.setPresence({
        status: "online",
        game: {
            name: "awd",
            type: "PLAYING"
        }
    })

    console.info("Bot [" + client.user.username + "] is online!")
}