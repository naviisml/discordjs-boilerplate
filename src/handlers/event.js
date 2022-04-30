// Event handler is almost the same as command handler. I won't explain myself here.
const { readdirSync } = require("fs")
const path = require("path")

module.exports = client => {
    /**
     * ...
     */
    const load = (dir) => {
        const events = readdirSync(path.join(__dirname, `../events/${dir}/`)).filter(d => d.endsWith('.js'))

        for (let file of events) {
            const evt = require(`../events/${dir}/${file}`)
            let eName = file.split('.')[0]

            client.on(eName, evt.bind(null, client))
        }
    }

    // client events
    let dirs = ["client"]

    dirs.forEach(dir => load(dir))
}