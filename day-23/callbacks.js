const serverCallback = (req, res) => {
  // Route for today's date
  if (req.url === '/today') {
    const todayStr = new Date().toISOString().split('T')[0];

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ date: todayStr }));
    return;
  }

  // Route for a motivational message
  if (req.url === '/tomorrow') {
    const message =
      'Clean code always looks like it was written by someone who cares.';

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ motivation: message }));
    return;
  }

  // Fallback for unmatched routes
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Route not found' }));
};
