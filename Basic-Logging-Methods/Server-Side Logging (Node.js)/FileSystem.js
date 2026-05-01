const fs = require('fs');

function logToFile(message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync('server.log', `${timestamp} - ${message}\n`);
}

logToFile('Server started on port 3000');
