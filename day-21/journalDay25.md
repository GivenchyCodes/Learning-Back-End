\*\*

- Day 25 In-Memory Traffic Rate Limiting Guardrail
- Day 25 Maintenance Utility: Scans your backups directory and purges snapshots older than 7 days.
- july/09/2026 \*

## Previous Day 24 Task

I Mapped out the targeted production database tracking file segment that needs state protection copies
const sourceFile = path.join(process.cwd(), 'tasks.json');

## Objective of today tasks:Day 25 Asynchronous Request Diagnostic Logger Middleware

**_Import from all handlers on yestday task_**

**_Read all contents and file names inside the backup folder as an array of strings_**

**_process.stdout.write() Local copy backed up successfully_**
**_process.stderr.write Backup aborted:_**

## Goal of Todays day25

- Async function logRequest(req, statusText = 'OK', statusCode = 200) {}
- Establish a dedicated network listener port matching my project specifications
  const PORT = 3001;
- Define the absolute log file location targeting server.log inside my root application directory
  const LOG_FILE_PATH = path.join(process.cwd(), 'server.log');
- Initialize an in-memory tracking collection Map to keep tabs on client IP request traffic timestamps
  const ipTracker = new Map();
- Define rate limit window boundary parameters matching requirement rules (60,000 milliseconds = 1 minute)
  const RATE_LIMIT_WINDOW_MS = 60 \* 1000;
- Set the absolute maximum number of request hit markers allowed per IP inside that 60-second window
  const MAX_REQUESTS_PER_WINDOW = 20;
- Capture the current timestamp in unix epoch milliseconds for immediate lookup evaluation

### Connection to host

- Extract or default host configurations to prevent relative url parsing construction failures
  const host = req.headers.host || `localhost:${PORT}`;
- Construct an absolute URL object out of the request stream address meta elements
  const parsedUrl = new URL(req.url, `http://${host}`);
- Isolate the pure URL pathname context mapping safely away from any appended query strings parameters
  let { pathname } = parsedUrl;

### ROUTE

Run the core routing matching engine blocks inside an application level try-catch safety net box

- Route 1: GET /tasks/stats -> Analytical metrics endpoint processing rule block
- Route 2: /tasks -> Base collection data processing orchestration rule block
- Route 3: /tasks/:id -> Resource element specific operations processing block

### Terminal CMD

- htop
- watch -n 0l5 "lsof -i :3001"
- tcpdump -x -vv -i lo0 port 3001
- tcpdump -i lo0 port 3001 -w server.log

### Server.log

[2026-07-09 11:01:47] GET /tasks - 200 OK (curl/8.5.0)

### In Conclusion to what i learnt

1. **The Core Logic Structure**: Notice that `server.js` functions sequentially. When a user requests data, the server extracts their IP first, validates traffic limit arrays, overrides `res.end` to intercept metadata logs later, handles specific path routes, and then triggers the logger block.
2. **Memory Leak Prevention**: Look at `isRateLimited()`. Instead of storing every single request forever (which would eventually fill up my computer's RAM), it actively updates itself using `.filter()` to throw out old timestamps older than a minute.
3. **Regex File Parsing**: Look at `rotateOldBackups()`. It scans string data files like `backup-2026-07-01T12-30-00.json`, restores required date formatting configurations, evaluates timestamps, and uses non-blocking file handling to execute operations safely.
