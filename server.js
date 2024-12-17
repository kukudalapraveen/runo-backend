const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('./config/db');
const logRoutes = require('./routes/logRoutes');
const archiveWorker = require('./services/archiveWorker');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use('/api', logRoutes);

// MongoDB Connection
mongoose();
console.log("Starting archive worker service...");
archiveWorker(); // Initial run if needed

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
