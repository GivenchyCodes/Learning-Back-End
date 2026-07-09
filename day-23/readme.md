# 🌐 Day 23 — Introduction to Web Servers and HTTP (ESM Edition)

Welcome to Day 23! Today, you shift from building terminal tools (`task-cli`) to writing persistent programs that live on the internet using modern **ES Modules (`import/export`)**.

## ⚙️ Project Setup Configuration

Before executing your code, you must explicitly tell Node.js to interpret your files as ES Modules.

1. Initialize a package manifest file in your directory:
   ```bash
   npm init -y
   ```
2. Open the newly generated `package.json` file.
3. Append the `"type": "module"` configuration flag to the root object:
   ```json
   {
     "name": "day23-server",
     "version": "1.0.0",
     "type": "module",
     "main": "server.js"
   }
   ```

---

## 🛠️ Code Blueprint: Your First Native ESM Server

Create a file named `server.js`. This script leverages native Node.js core networking libraries via modern import architecture.

```javascript
// 1. Import core networking capabilities using ES Module syntax
import http from 'node:http';

const PORT = 3000;

// 2. Provision the server instance
const server = http.createServer((req, res) => {
  // Log the request parameters to the terminal console
  console.log(`Received ${req.method} request at URL: ${req.url}`);

  // 3. Construct the response header matrix
  res.writeHead(200, { 'Content-Type': 'application/json' });

  // 4. Formulate the response package payload
  const responsePayload = {
    message: 'Hello from Day 23 ESM Server!',
    status: 'Success',
    timestamp: new Date().toISOString(),
  };

  // 5. Finalize the communication stream and transmit payload
  res.end(JSON.stringify(responsePayload));
});

// 6. Bind the application process to the designated hardware port
server.listen(PORT, () => {
  console.log(
    `🚀 ESM Server successfully deployed and listening on http://localhost:${PORT}`,
  );
});
```

---

## 🧪 Step-by-Step Practice Guide

Follow these sequential steps to run and interact with your script:

### Step 1: Fire Up the Server Process

Boot your persistent server process inside your system terminal:

```bash
node server.js
```

_(Notice how the terminal remains occupied and doesn't return to the command prompt)_.

### Step 2: Query the Server Instance

Open a separate terminal window or a web browser to ping your server:

```bash
curl http://localhost:3000/tasks
```

### Step 3: Observe the Server Terminal Output

Look back at your first terminal window. You will see your server-side log:

```text
Received GET request at URL: /tasks
```

### Step 4: Terminate the Persistent Loop

When you are ready to stop your running server, shut it down using:

```text
Press Ctrl + C
```

---

## 🦾 Coding Challenges for Practice

### 🥊 Challenge 1: Simple Route Switching

Modify the callback to serve different messages depending on `req.url`.

- If `req.url === '/today'`, return a JSON containing the current date.
- If `req.url === '/tomorrow'`, return a motivational coding message.

### 🏆 Challenge 2: The CLI to Web Bridge

Integrate your storage file operations from your mini-project.

- **Tip**: Use `import fs from 'node:fs/promises';` to read your file.
- When someone requests `GET http://localhost:3000/tasks`, read your `tasks.json` file.
- Stream or respond with the raw task array database using `res.end()`.
