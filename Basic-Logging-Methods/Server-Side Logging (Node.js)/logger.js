const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // Save errors separately
    new winston.transports.File({ filename: 'combined.log' }), // Save all logs here
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

module.exports = logger;
