// Import the built-in HTTP module to create the web server
import http from "node:http";
// Import the promise-based File System module to handle asynchronous file operations
import fs from "node:fs/promises";
// Import the Path module to safely handle and resolve file system paths
import path from "node:path";

// Define the port number where the server will listen for incoming requests
const PORT = 3001;
// Resolve the absolute file path to the 'tasks.json' storage file
const TASKS_FILE = path.resolve("./tasks.json");

// Helper function to safely read tasks from the JSON file
async function readTasks() {
  try {
    // Attempt to read the tasks file asynchronously using UTF-8 encoding
    const data = await fs.readFile(TASKS_FILE, "utf-8");
    // Parse and return the JSON array from the file string
    return JSON.parse(data);
  } catch (error) {
    // If the file does not exist yet, return an empty array fallback
    if (error.code === "ENOENT") return [];
    // Re-throw any other unexpected file reading errors
    throw error;
  }
}

// Helper function to safely save tasks array back to the JSON file
async function saveTasks(tasks) {
  // Write the updated array back to the JSON file with clean 2-space code indentation
  await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2), "utf-8");
}

// Create the HTTP server instance and pass an asynchronous request listener callback
const server = http.createServer(async (req, res) => {
  // Safely fallback to localhost if the incoming request header is missing
  const host = req.headers.host || `localhost:${PORT}`;
  // Construct a full URL object safely
  const parsedUrl = new URL(req.url, `http://${host}`);
  // Extract the pathname from the parsed URL object
  const { pathname } = parsedUrl;

  // Route: GET /tasks
  if (req.method === "GET" && pathname === "/tasks") {
    try {
      // Fetch the tasks using our helper function
      const tasks = await readTasks();
      // Set a successful 200 status code and specify that the response body is JSON
      res.writeHead(200, { "Content-Type": "application/json" });
      // Send the parsed tasks array back to the client as a JSON string
      res.end(JSON.stringify(tasks));
    } catch (error) {
      // Handle server-side errors with a 500 Internal Server Error status
      res.writeHead(500, { "Content-Type": "application/json" });
      // Send a generic error message string back to the client
      res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
    // Exit the request listener early to prevent falling through to subsequent routes
    return;
  }

  // Route: POST /tasks
  if (req.method === "POST" && pathname === "/tasks") {
    // Initialize an empty string variable to accumulate incoming data chunks
    let body = "";

    // Safeguard against stream disruptions
    req.on("error", () => {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Stream interrupted" }));
    });

    // Listen for data chunks being transmitted in the request stream
    req.on("data", (chunk) => {
      // Append each buffer chunk converted to a text string into our body variable
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        // Enforce basic validation to ensure the incoming body data is not empty
        if (!body.trim()) {
          // Respond with a 400 Bad Request error if no payload body was sent
          res.writeHead(400, { "Content-Type": "application/json" });
          // Return an error message informing the client to provide valid data
          res.end(JSON.stringify({ error: "Missing request body payload" }));
          return;
        }

        // Declare a variable to hold the parsed JavaScript object data securely
        let payload;
        try {
          // Attempt to parse the incoming text body data into a JavaScript object
          payload = JSON.parse(body);
        } catch (error) {
          // Respond with a 400 Bad Request if the text string is malformed JSON
          res.writeHead(400, { "Content-Type": "application/json" });
          // Return an error message indicating invalid JSON data syntax
          res.end(JSON.stringify({ error: "Invalid JSON format received" }));
          return;
        }

        // Validate that the required 'title' field exists and is a non-empty string
        if (
          !payload.title ||
          typeof payload.title !== "string" ||
          payload.title.trim() === ""
        ) {
          // Respond with a 400 Bad Request status code due to a failed field validation
          res.writeHead(400, { "Content-Type": "application/json" });
          // Return an error message specifying that a valid text title is required
          res.end(
            JSON.stringify({
              error: "Validation failed: title string is required",
            }),
          );
          return;
        }

        // Read the existing tasks array from the storage file
        const currentTasks = await readTasks();
        // Create a new task object sanitizing text fields and injecting a unique timestamp ID
        const newTask = {
          id: Date.now(),
          title: payload.title.trim(),
          completed: Boolean(payload.completed),
        };

        // Create a new array reference instead of using direct mutation (.push)
        const updatedTasks = [...currentTasks, newTask];
        // Write the updated array to file using our helper function
        await saveTasks(updatedTasks);

        // Respond with a 201 Created status code indicating resource creation success
        res.writeHead(201, { "Content-Type": "application/json" });
        // Return the newly created task object data back to the client API user
        res.end(JSON.stringify(newTask));
      } catch (error) {
        // Handle database file writing failures with a 500 status code response
        res.writeHead(500, { "Content-Type": "application/json" });
        // Send a generic error message string back to the client interface
        res.end(JSON.stringify({ error: "Internal Server Error" }));
      }
    });
    // Exit the request listener early to isolate the async stream callback operations
    return;
  }

  // Route: PUT /tasks/:id (Updates task title and/or completed status)
  if (req.method === "PUT" && pathname.startsWith("/tasks/")) {
    // Split the pathname string by slashes to safely isolate the last item array entry
    const pathParts = pathname.split("/");
    // Extract and parse the very last item in the path array, converting it to an integer
    const taskId = parseInt(pathParts[pathParts.length - 1], 10);

    // Validate that the ID extracted from the path resolves to a valid integer number
    if (Number.isNaN(taskId)) {
      // Respond with a 400 Bad Request status code due to an invalid path format
      res.writeHead(400, { "Content-Type": "application/json" });
      // Send a descriptive error string back to the client interface
      res.end(JSON.stringify({ error: "Invalid task ID format" }));
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: `Task ${taskId} update placeholder` }));
    return;
  }

  // Catch-all fallback route for handling undefined endpoints cleanly
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Resource route not found" }));
});

// Start listening for inbound connections on the assigned port
server.listen(PORT);
