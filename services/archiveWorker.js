const Log = require('../models/Log');
const ArchivedLog = require('../models/ArchivedLog');
const cron = require('node-cron');

const archiveWorker = async () => {
    try {
        const NO_OF_DAYS = parseInt(process.env.NO_OF_DAYS, 10) || 30; // Default to 30 days if NO_OF_DAYS is not defined
        const ARCHIVE_BEFORE_DATE = new Date();
        ARCHIVE_BEFORE_DATE.setDate(ARCHIVE_BEFORE_DATE.getDate() - NO_OF_DAYS);

        console.log(`Archiving logs older than ${NO_OF_DAYS} days...`);

        // Fetch logs older than the configured number of days
        const logsToArchive = await Log.find({ timestamp: { $lt: ARCHIVE_BEFORE_DATE } });

        if (logsToArchive.length > 0) {
            await ArchivedLog.insertMany(logsToArchive); // Copy logs to archivedLogs
            await Log.deleteMany({ timestamp: { $lt: ARCHIVE_BEFORE_DATE } }); // Delete logs
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

module.exports = archiveWorker;
