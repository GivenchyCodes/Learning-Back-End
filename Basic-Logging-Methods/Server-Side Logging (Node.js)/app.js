const logger = require('./logger');

// Test different levels
logger.info('The application has started!');
logger.warn('Heads up! Something looks a bit off.');
logger.error('System Failure: Could not connect to the database.');

console.log(
  "Check your folder! You should see 'error.log' and 'combined.log' now.",
);
