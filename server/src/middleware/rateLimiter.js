const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
    windowMs: 10000,
    max: 10,
});