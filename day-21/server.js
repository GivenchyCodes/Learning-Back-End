// // Import the native Node.js HTTP networking module to orchestrate server capabilities
// import http from 'node:http';
// // Import your centralized API request handlers from the day-24 controller module
// import {
//   handleGetTasks,
//   handlePostTask,
//   handlePutTask,
//   handleDeleteTask,
//   handleGetStats,
// } from './controller.js';

// // Establish a dedicated network listener port matching your project specs
// const PORT = 3001;

// // Instantiate the standard Node HTTP server framework with a unified request processor
// const server = http.createServer((req, res) => {
//   // Extract or default host configurations to prevent relative url construction failures
//   const host = req.headers.host || `localhost:${PORT}`;
//   // Construct an absolute URL object out of the request stream address meta elements
//   const parsedUrl = new URL(req.url, `http://${host}`);
//   // Isolate the pure URL pathname context mapping safely away from any query strings
//   let { pathname } = parsedUrl;

//   // Sanitize path strings by stripping trailing slashes to guarantee routing match uniformity
//   if (pathname.length > 1 && pathname.endsWith('/')) {
//     pathname = pathname.slice(0, -1);
//   }

//   // Route 1: GET /tasks/stats -> Analytical metrics endpoint processing rule block
//   if (pathname === '/tasks/stats') {
//     if (req.method === 'GET') {
//       handleGetStats(req, res);
//       return;
//     }
//     res.writeHead(405, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({ error: 'Method Not Allowed on stats endpoint' }));
//     return;
//   }

//   // Route 2: /tasks -> Base collection data processing orchestration rule block
//   if (pathname === '/tasks') {
//     if (req.method === 'GET') {
//       handleGetTasks(req, res);
//       return;
//     }
//     if (req.method === 'POST') {
//       handlePostTask(req, res);
//       return;
//     }
//     res.writeHead(405, { 'Content-Type': 'application/json' });
//     res.end(
//       JSON.stringify({ error: 'Method Not Allowed on base task collection' }),
//     );
//     return;
//   }

//   // Route 3: /tasks/:id -> Resource element specific operations processing block
//   if (pathname.startsWith('/tasks/')) {
//     const pathParts = pathname.split('/');
//     const taskId = parseInt(pathParts[pathParts.length - 1], 10);

//     if (Number.isNaN(taskId)) {
//       res.writeHead(400, { 'Content-Type': 'application/json' });
//       res.end(
//         JSON.stringify({ error: 'Invalid parametric task ID formatting' }),
//       );
//       return;
//     }

//     if (req.method === 'PUT') {
//       handlePutTask(req, res, taskId);
//       return;
//     }
//     if (req.method === 'DELETE') {
//       handleDeleteTask(res, taskId);
//       return;
//     }
//     res.writeHead(405, { 'Content-Type': 'application/json' });
//     res.end(
//       JSON.stringify({
//         error: 'Method Not Allowed on target resource element',
//       }),
//     );
//     return;
//   }

//   // Fallback Catch-All Route: Return a standardized 404 message for missing API endpoints
//   res.writeHead(404, { 'Content-Type': 'application/json' });
//   res.end(
//     JSON.stringify({ error: 'Resource route endpoint mapping not found' }),
//   );
// });

// // 🚀 CRITICAL FIX: Activate the HTTP server listener onto the port with a logging callback
// server.listen(PORT, () => {
//   // This message tells you the server is successfully holding the port open!
//   process.stdout.write(
//     `🚀 Day 24 live data server running on http://localhost:${PORT}\n`,
//   );
// });

// Import the native Node.js HTTP networking module to orchestrate server capabilities
import http from 'node:http';
// Import your centralized API request handlers from the day-24 controller module
import {
  handleGetTasks, // Import function to handle GET requests for fetching all tasks
  handlePostTask, // Import function to handle POST requests for creating new tasks
  handlePutTask, // Import function to handle PUT requests for updating existing tasks
  handleDeleteTask, // Import function to handle DELETE requests for removing tasks
  handleGetStats, // Import function to handle GET requests for task statistics
} from './controller.js'; // Specify the relative path to the controller module file

// Establish a dedicated network listener port matching your project specs
const PORT = 3001;

// Instantiate the standard Node HTTP server framework with a unified request processor
const server = http.createServer((req, res) => {
  // Extract or default host configurations to prevent relative url construction failures
  const host = req.headers.host || `localhost:${PORT}`;
  // Construct an absolute URL object out of the request stream address meta elements
  const parsedUrl = new URL(req.url, `http://${host}`);
  // Isolate the pure URL pathname context mapping safely away from any query strings
  let { pathname } = parsedUrl;

  // Sanitize path strings by stripping trailing slashes to guarantee routing match uniformity
  if (pathname.length > 1 && pathname.endsWith('/')) {
    // Remove the final character from the pathname string if it is a slash
    pathname = pathname.slice(0, -1);
  }

  // Route 1: GET /tasks/stats -> Analytical metrics endpoint processing rule block
  if (pathname === '/tasks/stats') {
    // Check if the incoming HTTP request method is a GET request
    if (req.method === 'GET') {
      // Forward the request and response objects to the stats handler function
      handleGetStats(req, res);
      // Terminate further execution of this function for this specific request
      return;
    }
    // Respond with a 405 Method Not Allowed status code and JSON header
    res.writeHead(405, { 'Content-Type': 'application/json' });
    // Send the JSON stringified error message and close the response stream
    res.end(JSON.stringify({ error: 'Method Not Allowed on stats endpoint' }));
    // Terminate further execution of this function for this specific request
    return;
  }

  // Route 2: /tasks -> Base collection data processing orchestration rule block
  if (pathname === '/tasks') {
    // Check if the incoming HTTP request method is a GET request
    if (req.method === 'GET') {
      // Forward the request and response objects to the fetch tasks handler
      handleGetTasks(req, res);
      // Terminate further execution of this function for this specific request
      return;
    }
    // Check if the incoming HTTP request method is a POST request
    if (req.method === 'POST') {
      // Forward the request and response objects to the create task handler
      handlePostTask(req, res);
      // Terminate further execution of this function for this specific request
      return;
    }
    // Respond with a 405 Method Not Allowed status code and JSON header
    res.writeHead(405, { 'Content-Type': 'application/json' });
    // Send the JSON stringified error message and close the response stream
    res.end(
      JSON.stringify({ error: 'Method Not Allowed on base task collection' }),
    );
    // Terminate further execution of this function for this specific request
    return;
  }

  // Route 3: /tasks/:id -> Resource element specific operations processing block
  if (pathname.startsWith('/tasks/')) {
    // Split the pathname string into an array using the slash character as a separator
    const pathParts = pathname.split('/');
    // Extract the final array element and convert it into a base-10 integer
    const taskId = parseInt(pathParts[pathParts.length - 1], 10);

    // Validate whether the parsed ID string successfully resolved into a valid number
    if (Number.isNaN(taskId)) {
      // Respond with a 400 Bad Request status code and JSON header
      res.writeHead(400, { 'Content-Type': 'application/json' });
      // Send the JSON stringified invalid formatting error message and close the stream
      res.end(
        JSON.stringify({ error: 'Invalid parametric task ID formatting' }),
      );
      // Terminate further execution of this function for this specific request
      return;
    }

    // Check if the incoming HTTP request method is a PUT request
    if (req.method === 'PUT') {
      // Forward the request, response, and parsed ID to the update handler
      handlePutTask(req, res, taskId);
      // Terminate further execution of this function for this specific request
      return;
    }
    // Check if the incoming HTTP request method is a DELETE request
    if (req.method === 'DELETE') {
      // Forward the response object and parsed ID to the deletion handler
      handleDeleteTask(res, taskId);
      // Terminate further execution of this function for this specific request
      return;
    }
    // Respond with a 405 Method Not Allowed status code and JSON header
    res.writeHead(405, { 'Content-Type': 'application/json' });
    // Send the JSON stringified method error message and close the response stream
    res.end(
      JSON.stringify({
        error: 'Method Not Allowed on target resource element',
      }),
    );
    // Terminate further execution of this function for this specific request
    return;
  }

  // Fallback Catch-All Route: Return a standardized 404 message for missing API endpoints
  res.writeHead(404, { 'Content-Type': 'application/json' });
  // Send the JSON stringified route not found error message and close the stream
  res.end(
    JSON.stringify({ error: 'Resource route endpoint mapping not found' }),
  );
});

// 🚀 CRITICAL FIX: Activate the HTTP server listener onto the port with a logging callback
server.listen(PORT, () => {
  // This message tells you the server is successfully holding the port open!
  process.stdout.write(
    `🚀 Day 24 live data server running on http://localhost:${PORT}\n`,
  );
});
