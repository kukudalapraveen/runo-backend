const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: process.env.RATE_LIMIT, // Maximum 100 requests per minute per IP
    message: "Too many requests. Try again later.",
});
