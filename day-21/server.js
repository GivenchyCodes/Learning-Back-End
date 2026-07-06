import http from 'node:http';
import {
  handleGetTasks,
  handlePostTask,
  handlePutTask,
  handleDeleteTask,
} from './controller.js';

const PORT = 3001;

const server = http.createServer((req, res) => {
  const host = req.headers.host || `localhost:${PORT}`;
  const parsedUrl = new URL(req.url, `http://${host}`);
  const { pathname } = parsedUrl;

  // Collection Operations Mapping
  if (pathname === '/tasks') {
    if (req.method === 'GET') {
      handleGetTasks(req, res);
      return;
    }
    if (req.method === 'POST') {
      handlePostTask(req, res);
      return;
    }
  }

  // Id-Specific Operations Mapping
  if (pathname.startsWith('/tasks/')) {
    const pathParts = pathname.split('/');
    const taskId = parseInt(pathParts[pathParts.length - 1], 10);

    if (Number.isNaN(taskId)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid task ID format' }));
      return;
    }

    if (req.method === 'PUT') {
      handlePutTask(req, res, taskId);
      return;
    }
    if (req.method === 'DELETE') {
      handleDeleteTask(res, taskId);
      return;
    }
  }

  // Fallback Catch-All
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Resource route not found' }));
});

server.listen(PORT, () => {
  process.stdout.write(
    `🚀 Live data server listening on http://localhost:${PORT}\n`,
  );
});
