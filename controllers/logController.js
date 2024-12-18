const Log = require('../models/Log');

// Create a new log
const createLog = async (req, res) => {
    try {
        const { userId, endpoint, method } = req.body;

        if (!userId || !endpoint || !method) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const log = new Log({ userId, endpoint, method, timestamp: new Date() });
        await log.save();

        res.status(201).json({ success: true, data: log });
    } catch (error) {
        console.error("Error creating log:", error.message);
        res.status(500).json({ message: "Please Use enum values only 'GET', 'POST', 'PUT', 'DELETE' " });
    }
};

// Retrieve logs (add pagination and filtering support)
const getLogs = async (req, res) => {
    try {
        const { startDate, endDate, endpoint, user, page = 1, limit = 10 } = req.query;

        const query = {};
        if (startDate && endDate) query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
        if (endpoint) query.endpoint = endpoint;
        if (user) query.userId = user;

        const logs = await Log.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit));
         // Check for the "next page" by fetching one extra record
         const totalLogs = await Log.countDocuments(query);

         // Decide whether a next page exists
         const totalPages = Math.ceil(totalLogs / limit);
         const hasNextPage = page < totalPages;
 
         // Send Response
         res.status(200).json({
             success: true,
             data: logs,
             pagination: {
                 currentPage: Number(page),
                 totalPages,
                 hasNextPage,
                 totalLogs,
             },
         });
     } catch (error) {
         console.error("Error retrieving logs:", error.message);
         res.status(500).json({ message: "Server Error" });
     }
};

// Analytics: summary
const getSummary = async (req, res) => {
    try {
        const summary = await Log.aggregate([
            { $group: { _id: "$endpoint", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        const mostAccessed = summary[0] || null;

        res.status(200).json({
            success: true,
            data: { summary, mostAccessed }
        });
    } catch (error) {
        console.error("Error getting summary:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

// Analytics: user-specific activity
const getUserAnalytics = async (req, res) => {
    try {
        const { userId } = req.params;

        const userLogs = await Log.aggregate([
            { $match: { userId } },
            { $group: { _id: "$endpoint", count: { $sum: 1 } } }
        ]);

        const totalRequests = userLogs.reduce((acc, log) => acc + log.count, 0);

        res.status(200).json({
            success: true,
            data: { totalRequests, endpoints: userLogs }
        });
    } catch (error) {
        console.error("Error getting user analytics:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { createLog, getLogs, getSummary, getUserAnalytics };

