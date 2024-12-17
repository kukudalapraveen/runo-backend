const Log = require('../models/Log');
const ArchivedLog = require('../models/ArchivedLog');
const cron = require('node-cron');

const archiveWorker = async () => {
    try {
        const THIRTY_DAYS_AGO = new Date();
        THIRTY_DAYS_AGO.setDate(THIRTY_DAYS_AGO.getDate() - 30);
        // changed it for 5mins to test
        // THIRTY_DAYS_AGO.setMinutes(THIRTY_DAYS_AGO.getMinutes() - 5);

        console.log("Archiving logs older than 30 days...");

        // Fetch logs older than 30 days
        const logsToArchive = await Log.find({ timestamp: { $lt: THIRTY_DAYS_AGO } });

        // If there are logs, archive and delete them
        if (logsToArchive.length > 0) {
            await ArchivedLog.insertMany(logsToArchive); // Copy logs to archivedLogs
            await Log.deleteMany({ timestamp: { $lt: THIRTY_DAYS_AGO } }); // Delete logs
            console.log(`Archived and deleted ${logsToArchive.length} logs.`);
        } else {
            console.log("No logs to archive.");
        }
    } catch (error) {
        console.error("Error archiving logs:", error.message);
    }
};

// Schedule cron job to run the archiveWorker at midnight every day
cron.schedule('0 0 * * *', async () => {
    console.log("Running the scheduled archiveWorker...");
    await archiveWorker();
});

//CRON FOR 1MIN
// cron.schedule('* * * * *', async () => {
//     console.log("Running the scheduled archiveWorker...");
//     await archiveWorker();
// });
module.exports = archiveWorker;
