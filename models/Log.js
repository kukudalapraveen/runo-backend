const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    endpoint: { type: String, required: true },
    method: { type: String, enum: ['GET', 'POST', 'PUT', 'DELETE'], required: true },
    userId: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Log', logSchema);

