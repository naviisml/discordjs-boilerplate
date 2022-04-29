// Get the config.json file for the prefix
const config = require("../../config.json")

// new console.log functions
var console = (function(oldCons) {
    return {
        log: function(...args){
            oldCons.log(...args)
        },
        info: function (...args) {
            oldCons.info(...args)
        },
        warn: function (...args) {
            oldCons.warn(`\x1b[33m[WARNING]\x1b[0m`, ...args)
        },
        error: function (...args) {
            oldCons.error(`\x1b[31m[ERROR]\x1b[0m`, ...args)
        },
        debug: function (...args) {
			if (config.debug == false) return;

            oldCons.debug(`\x1b[1m[DEBUG]\x1b[0m`, ...args, "\x1b[0m")
        }
    }
}(global.console))

global.console = console