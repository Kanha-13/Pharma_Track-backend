const nodeCron = require("node-cron")
const { mongo_backup, mongo_restore } = require("./mongo_backup")

const cron_backup = (interval) => {
    nodeCron.schedule(interval, () => {
        mongo_backup();
    })
}

module.exports = { cron_backup }