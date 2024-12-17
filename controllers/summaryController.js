const Log = require('../models/Log');

// GET /analytics/summary
exports.getApiSummary = async (req, res) => {
    try {
        const summary = await Log.aggregate([
            { $group: { _id: "$endpoint", totalRequests: { $sum: 1 } } },
            { $sort: { totalRequests: -1 } },
        ]);

        res.json({
            totalRequestsPerEndpoint: summary,
            mostFrequentlyAccessed: summary[0]?._id || null,
        });
    } catch (error) {
        console.error("Error fetching summary:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// GET /analytics/user/:userId
exports.getUserAnalytics = async (req, res) => {
    try {
        const { userId } = req.params;

        const userLogs = await Log.aggregate([
            { $match: { userId } },
            { $group: { _id: "$endpoint", totalRequests: { $sum: 1 } } },
        ]);

        const totalRequests = userLogs.reduce((sum, log) => sum + log.totalRequests, 0);

        res.json({
            totalRequests,
            endpointAccess: userLogs,
        });
    } catch (error) {
        console.error("Error fetching user analytics:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
