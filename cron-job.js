const nodeCron = require("node-cron")
const mongo_backup = require("./mongo_backup")

nodeCron.schedule('*/5 * * * * *', () => {
    mongo_backup();
})
