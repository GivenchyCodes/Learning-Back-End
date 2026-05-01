const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(), // Logs in JSON for easy searching later
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // Only errors go here
    new winston.transports.File({ filename: 'combined.log' }), // Everything goes here
  ],
});

// Use it like this:
logger.info('New user signed up');
logger.error('Database connection failed!');
