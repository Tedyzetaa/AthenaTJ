"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const logger_1 = require("../logger");
function errorHandler(err, req, res, next) {
    logger_1.logger.error('Unhandled error', { error: err });
    res.status(500).json({ error: 'Internal server error.' });
}
