const nodeCron = require("node-cron")

nodeCron.schedule('*/2 * * * * *', () => {
    // This job will run every second
    console.log(new Date().toDateString());
})