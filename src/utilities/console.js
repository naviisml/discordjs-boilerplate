// Get the config.json file for the prefix
const config = require("../../config.json")

// parse and return the current time
let parseTimestamp = () => {
    let date = new Date()

    return `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`
}

// new console.log functions
let console = (function(oldCons) {
    return {
        log: function(...args){
            oldCons.log(...args)

            return this
        },
        info: function (...args) {
            oldCons.info(parseTimestamp(), ...args)

            return this
        },
        warn: function (...args) {
            oldCons.warn(parseTimestamp(), `\x1b[33m[WARNING]\x1b[0m`, ...args)

            return this
        },
        error: function (...args) {
            oldCons.error(parseTimestamp(), `\x1b[31m[ERROR]\x1b[0m`, ...args)

            return this
        },
        debug: function (...args) {
			if (config.debug == false) return;

            oldCons.debug(parseTimestamp(), `\x1b[1m[DEBUG]\x1b[0m`, ...args, "\x1b[0m")

            return this
        },
    }
}(global.console))

global.console = console