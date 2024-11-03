const nodeCron = require("node-cron")
const { mongo_backup } = require("./mongo_backup")

const cron_backup = () => {
    if (process.env.BACKUP_INTERVAL) {
        nodeCron.schedule(process.env.BACKUP_INTERVAL, () => {
            mongo_backup();
        })
    }
}

module.exports = { cron_backup }