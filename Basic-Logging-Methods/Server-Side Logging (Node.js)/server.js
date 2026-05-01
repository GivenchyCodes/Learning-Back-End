const express = require('express');
const app = express();
const port = 3000;

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Fiona' },
];

// This is your API "Endpoint"
app.get('/API/users', (req, res) => {
  console.log('--- Backend: Sending users to the browser ---');
  console.table(users); // This still prints in your TERMINAL
  res.json(users); // This sends the data to the BROWSER
});

// 1. THE DATA (For machines/logic)
app.get('/API/users', (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/api/users`);
});
