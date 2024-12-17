const mongoose = require('mongoose');

const ArchivedLogSchema = new mongoose.Schema({
    endpoint: String,
    // method: String,
    method: { type: String, enum: ['GET', 'POST', 'PUT', 'DELETE'], required: true },
    userId: String,
    timestamp: Date,
});

module.exports = mongoose.model('ArchivedLog', ArchivedLogSchema);
