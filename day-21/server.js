// Import the native Node.js HTTP networking module to orchestrate server capabilities
import http from 'node:http';
// Import promise-wrapped filesystem modules for asynchronous diagnostic logging file appends
import fs from 'node:fs/promises';
// Import Node's path engine utility to determine the log file location safely across platforms
import path from 'node:path';
// Import your centralized API request endpoint handlers from the day-24 controller module
import {
  handleGetTasks,
  handlePostTask,
  handlePutTask,
  handleDeleteTask,
  handleGetStats,
} from './controller.js';
// Import the newly configured Day 25 backup rotation routine from your backup tool module
import { rotateOldBackups } from './bd.js';

// Establish a dedicated network listener port matching your project specifications
const PORT = 3001;
// Define the absolute log file location targeting server.log inside your root application directory
const LOG_FILE_PATH = path.join(process.cwd(), 'server.log');

// Initialize an in-memory tracking collection Map to keep tabs on client IP request traffic timestamps
const ipTracker = new Map();
// Define rate limit window boundary parameters matching requirement rules (60,000 milliseconds = 1 minute)
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
// Set the absolute maximum number of request hit markers allowed per IP inside that 60-second window
const MAX_REQUESTS_PER_WINDOW = 20;

/**
 * Day 25 Asynchronous Request Diagnostic Logger Middleware
 */
async function logRequest(req, statusText = 'OK', statusCode = 200) {
  // Try to assemble and write request details to disk without interrupting the active request pipeline
  try {
    // Instantiate a new Date object representing the exact current moment of execution
    const now = new Date();
    // Format the date string precisely into YYYY-MM-DD HH:MM:SS format by stripping out the 'T' and decimals
    const formattedDate = now.toISOString().replace('T', ' ').substring(0, 19);

    // Extract the HTTP method (GET, POST, etc.) or default to UNKNOWN if undefined
    const method = req.method || 'UNKNOWN';
    // Extract the relative URL path or default to a root slash string marker
    const urlPath = req.url || '/';
    // Extract the client's user-agent header info or fallback to an explicit placeholder string
    const userAgent = req.headers['user-agent'] || 'Unknown Agent';

    // Construct the standardized diagnostic log message line matching my required roadmap example layout
    const logLine = `[${formattedDate}] ${method} ${urlPath} - ${statusCode} ${statusText} (${userAgent})\n`;

    // Append the assembled log trace text string asynchronously into the permanent server.log system file
    await fs.appendFile(LOG_FILE_PATH, logLine, 'utf-8');
    // Intercept disk permission faults or file lock exceptions inside the catch handler
  } catch (error) {
    // Write out an explicit logger failure warning notification straight into the terminal error window stream
    process.stderr.write(
      ` ⚠️ Diagnostic Logger failure: ${String(error.message)}\n`,
    );
  }
}

/**
 * Day 25 In-Memory Traffic Rate Limiting Guardrail
 */
function isRateLimited(clientIp) {
  // Capture the current timestamp in unix epoch milliseconds for immediate lookup evaluation
  const now = Date.now();

  // Checking logic: If this IP footprint has never made a request before, start tracking it
  if (!ipTracker.has(clientIp)) {
    // Log the current timestamp hit inside a new array and save it to our cache map dictionary
    ipTracker.set(clientIp, [now]);
    // Return false immediately to signal that this request does not break any traffic limits
    return false;
  }

  // Retrieve previous request hit history timestamp array records for this specific client IP connection
  const requestTimestamps = ipTracker.get(clientIp);

  // Housekeeping step: Clean out and filter out any expired hit markers that occurred more than 60 seconds ago
  const activeTimestamps = requestTimestamps.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  // Push the current request's timestamp hit marker into the active tracking window chain array
  activeTimestamps.push(now);
  // Save the updated, filtered tracking array back into our global memory Map cache dictionary
  ipTracker.set(clientIp, activeTimestamps);

  // Evaluation step: Return true if active timestamp count exceeds 20 requests per window, triggering blockades
  return activeTimestamps.length > MAX_REQUESTS_PER_WINDOW;
}

// Instantiate the standard Node HTTP server framework with a unified request processor callback
const server = http.createServer(async (req, res) => {
  // Extract the unique remote client IP address out of the underlying active socket connection structure
  const clientIp = req.socket.remoteAddress || '127.0.0.1';

  // Security Checkpoint: Evaluate if incoming remote traffic triggers a rate-limiting abuse flag
  if (isRateLimited(clientIp)) {
    // Immediately write out an HTTP status code 429 Too Many Requests header to the response stream
    res.writeHead(429, { 'Content-Type': 'application/json' });
    // Finalize the response connection payload stream with an explicit JSON abuse error message payload
    res.end(
      JSON.stringify({ error: 'Too Many Requests. Rate limit exceeded.' }),
    );

    // Log the rejected transaction details into your permanent server.log system diagnostics file
    await logRequest(req, 'Too Many Requests', 429);
    // Terminate further code execution early for this request to protect your web server resources
    return;
  }

  // Intercept response stream termination to capture the final HTTP response status code output dynamically
  const originalEnd = res.end;
  // Overwrite the native response.end method hook to execute custom logging routines just before closing
  res.end = function (chunk, encoding, callback) {
    // Immediately restore the native original response.end reference to prevent infinite recursion loop faults
    res.end = originalEnd;
    // Establish a status description outcome text marker based on whether the code indicates a successful hit
    const outcome =
      res.statusCode >= 200 && res.statusCode < 300 ? 'OK' : 'Error';

    // Execute the diagnostic request file log helper in the background to capture the completed transaction lifecycle
    logRequest(req, outcome, res.statusCode);
    // Complete the standard HTTP payload delivery lifecycle by executing the native end command arguments
    return res.end(chunk, encoding, callback);
  };

  // Extract or default host configurations to prevent relative url parsing construction failures
  const host = req.headers.host || `localhost:${PORT}`;
  // Construct an absolute URL object out of the request stream address meta elements
  const parsedUrl = new URL(req.url, `http://${host}`);
  // Isolate the pure URL pathname context mapping safely away from any appended query strings parameters
  let { pathname } = parsedUrl;

  // Sanitize path strings by stripping trailing slashes to guarantee routing match consistency
  if (pathname.length > 1 && pathname.endsWith('/')) {
    // Slice off the final slash character from the pathname string variable update row
    pathname = pathname.slice(0, -1);
  }

  // Run the core routing matching engine blocks inside an application level try-catch safety net box
  try {
    // Route 1: GET /tasks/stats -> Analytical metrics endpoint processing rule block
    if (pathname === '/tasks/stats') {
      // Validate if the current method signature matches a standard HTTP GET lookup action
      if (req.method === 'GET') {
        // Forward the request and response objects down to the stats calculation processing function
        await handleGetStats(req, res);
        // Terminate further operational checks for this execution cycle block
        return;
      }
      // Respond with a 405 Method Not Allowed header status code if the method was anything else
      res.writeHead(405, { 'Content-Type': 'application/json' });
      // Deliver a structured JSON string message highlighting that the method is invalid here
      res.end(
        JSON.stringify({ error: 'Method Not Allowed on stats endpoint' }),
      );
      // Terminate execution for this request
      return;
    }

    // Route 2: /tasks -> Base collection data processing orchestration rule block
    if (pathname === '/tasks') {
      // Check if the current request is an HTTP GET collection call
      if (req.method === 'GET') {
        // Hand off control parameters directly to the read collection handler module function
        await handleGetTasks(req, res);
        // Terminate pipeline checking steps
        return;
      }
      // Check if the current request is an HTTP POST record creation call
      if (req.method === 'POST') {
        // Hand off stream execution parameters down to the append task processor controller module
        handlePostTask(req, res);
        // Terminate pipeline checking steps
        return;
      }
      // Issue a 405 boundary block check notice if any other HTTP method hit this route address
      res.writeHead(405, { 'Content-Type': 'application/json' });
      // Finalize response connection by sending standard stringified collection error block text
      res.end(
        JSON.stringify({ error: 'Method Not Allowed on base task collection' }),
      );
      // Terminate execution for this request
      return;
    }

    // Route 3: /tasks/:id -> Resource element specific operations processing block
    if (pathname.startsWith('/tasks/')) {
      // Split the sanitized pathname directory text into an array using slashes as split points
      const pathParts = pathname.split('/');
      // Extract the final array element index segment value and parse it down to an integer index key
      const taskId = parseInt(pathParts[pathParts.length - 1], 10);

      // Validate whether the target index string failed validation checks turning into a NaN identifier
      if (Number.isNaN(taskId)) {
        // Issue an explicit HTTP 400 Bad Request status code error tracking header block to the client
        res.writeHead(400, { 'Content-Type': 'application/json' });
        // Deliver structural verification formatting alert messages back to the network client caller
        res.end(
          JSON.stringify({ error: 'Invalid parametric task ID formatting' }),
        );
        // Exit endpoint pipeline operations early
        return;
      }
      // Check if the incoming request intent matches an HTTP PUT data update transaction sequence
      if (req.method === 'PUT') {
        // Forward parameters down to the task editor function inside your controller script module
        handlePutTask(req, res, taskId);
        // Exit routing map block
        return;
      }
      // Check if the incoming request intent matches an HTTP DELETE data destruction transaction sequence
      if (req.method === 'DELETE') {
        // Forward parameters down to the task removal function inside your controller script module
        handleDeleteTask(res, taskId);
        // Exit routing map block
        return;
      }
      // Fallback response for unhandled methods targeting specific elements
      res.writeHead(405, { 'Content-Type': 'application/json' });
      // Deliver structural error details notifying the operator regarding disallowed method parameters
      res.end(
        JSON.stringify({
          error: 'Method Not Allowed on target resource element',
        }),
      );
      // Exit endpoint routing block
      return;
    }
    // Fallback Catch-All Route: Return a standardized 404 message for missing API endpoints mapping rules
    res.writeHead(404, { 'Content-Type': 'application/json' });
    // Write out the target resource missing json text payload message string to wrap up operations
    res.end(
      JSON.stringify({ error: 'Resource route endpoint mapping not found' }),
    );
    // Capture global unexpected routing exceptions to prevent complete web server crashing anomalies
  } catch (globalError) {
    // Open a protective internal 500 error header payload delivery tracking line to the client socket
    res.writeHead(500, { 'Content-Type': 'application/json' });
    // Deliver explicit notice signaling severe engine core internal failure tracking alerts
    res.end(
      JSON.stringify({ error: 'Critical Internal Server Routing Fault' }),
    );
  }
});
// Activate the HTTP server listener onto the network port with a startup execution callback loop routine
server.listen(PORT, async () => {
  // Log an initial message to the stdout stream verifying that the network socket is open and listening
  process.stdout.write(
    ` 🚀 Day 25 live traffic & diagnostic server running on http://localhost:${PORT}\n`,
  );
  // Day 25 Goal 3 Execution: Run rolling database backup folder snapshot expiry checks immediately on system boot
  process.stdout.write(
    ` 🧹 Instantiating automated backup history rotation check...\n`,
  );
  // Wait for the backup rotation helper engine to scan files, parse timestamps, and purge items older than 7 days
  await rotateOldBackups();
});
