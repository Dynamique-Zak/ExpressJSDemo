const { createLogger, transports, format } = require('winston');

// Configuration du logger
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}] - ${message}`)
    ),
    transports: [new transports.Console()],
});

// Helper pour générer une réponse structurée avec logs
function createResponse(code, message, data = null) {
    const response = { code, message, data };
    logger.info(`Code: ${code}, Message: ${message}`);
    return response;
}

module.exports = { createResponse };