// Import specific task utility functions from the local taskManager module
import {
  addTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
  isTaskOverdue,
} from './taskManager.mjs';
// Import the task data loading utility from the local storage module
import { loadTasks } from './storage.mjs';

// Export an asynchronous function to handle HTTP GET requests for retrieving tasks
export async function handleGetTasks(req, res) {
  // Begin a try block to catch any unexpected runtime errors during execution
  try {
    // Wait for the asynchronous loadTasks function to retrieve the tasks array from storage
    const tasks = await loadTasks();
    // Safely parse the request URL by combining the relative path with the host domain or a default fallback
    const reqUrl = new URL(
      req.url,
      `http://${req.headers.host || 'localhost'}`,
    );

    // Extract the optional 'status' filter value from the URL query parameters
    const statusQuery = reqUrl.searchParams.get('status');
    // Extract the optional search keyword 'q' from the URL query parameters
    const searchQuery = reqUrl.searchParams.get('q');
    // Extract the optional 'overdue' filter flag from the URL query parameters
    const overdueQuery = reqUrl.searchParams.get('overdue');

    // Create a shallow copy of the original tasks array to manipulate without modifying the source data
    let processedTasks = [...tasks];

    // Check if a 'status' filter was provided in the query string
    if (statusQuery) {
      // Filter the tasks to keep only those matching the normalized, lowercase, and trimmed status value
      processedTasks = processedTasks.filter(
        (task) => task.status === statusQuery.toLowerCase().trim(),
      );
    }

    // Check if a search keyword 'q' was provided in the query string
    if (searchQuery) {
      // Normalize the search keyword by converting it to lowercase and removing surrounding whitespace
      const keyword = searchQuery.toLowerCase().trim();
      // Filter the tasks to keep only those whose descriptions contain the search keyword
      processedTasks = processedTasks.filter((task) =>
        task.description.toLowerCase().includes(keyword),
      );
    }

    // Check if the 'overdue' parameter explicitly equals the string 'true'
    if (overdueQuery === 'true') {
      // Filter the tasks using the imported helper to keep only tasks that are past their due date
      processedTasks = processedTasks.filter((task) => isTaskOverdue(task));
    }

    // Set the HTTP response header to status 200 OK and specify JSON content type
    res.writeHead(200, { 'Content-Type': 'application/json' });
    // Serialize the filtered tasks array into a JSON string and send it as the final response body
    res.end(JSON.stringify(processedTasks));
    // Catch any errors that occurred inside the try block
  } catch (error) {
    // Set the HTTP response header to status 500 Internal Server Error with JSON content type
    res.writeHead(500, { 'Content-Type': 'application/json' });
    // Send a JSON error message indicating something went wrong on the server side
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
}

// Export an asynchronous function to handle HTTP GET requests for task statistics
export async function handleGetStats(req, res) {
  // Begin a try block to catch any runtime errors during calculation
  try {
    // Wait for the asynchronous loadTasks function to fetch all tasks from storage
    const tasks = await loadTasks();
    // Count the total number of tasks currently stored in the system
    const total = tasks.length;

    // Check if there are no tasks in the system
    if (total === 0) {
      // Set the HTTP response header to status 200 OK with JSON content type
      res.writeHead(200, { 'Content-Type': 'application/json' });
      // Return a JSON response explicitly stating the dataset is completely empty
      res.end(
        JSON.stringify({ total: 0, message: 'Database collection is empty.' }),
      );
      // Exit the function early to prevent executing the remaining logic
      return;
    }

    // Filter and count how many tasks have an explicit status of 'todo'
    const todoCount = tasks.filter((t) => t.status === 'todo').length;
    // Filter and count how many tasks have an explicit status of 'in-progress'
    const inProgressCount = tasks.filter(
      (t) => t.status === 'in-progress',
    ).length;
    // Filter and count how many tasks have an explicit status of 'done'
    const doneCount = tasks.filter((t) => t.status === 'done').length;
    // Filter and count how many tasks return true when evaluated by the overdue checker helper
    const overdueCount = tasks.filter((t) => isTaskOverdue(t)).length;
    // Calculate the percentage of completed tasks, rounded to one decimal place, and cast it back to a number
    const completeRatio = Number(((doneCount / total) * 100).toFixed(1));

    // Set the HTTP response header to status 200 OK with JSON content type
    res.writeHead(200, { 'Content-Type': 'application/json' });
    // Send a structured JSON object containing all of the calculated summary statistics
    res.end(
      JSON.stringify({
        totalRecords: total,
        todoCount,
        inProgressCount,
        doneCount,
        overdueCount,
        completionPercentage: completeRatio,
      }),
    );
    // Catch any errors that occurred inside the try block
  } catch (error) {
    // Set the HTTP response header to status 500 Internal Server Error with JSON content type
    res.writeHead(500, { 'Content-Type': 'application/json' });
    // Send a JSON error message highlighting that a calculation or data load step failed
    res.end(
      JSON.stringify({ error: 'Internal Server Error calculation fault' }),
    );
  }
}

// Export a function to handle incoming HTTP POST requests for creating a new task
export function handlePostTask(req, res) {
  // Initialize an empty string variable to accumulate incoming raw request body data chunks
  let body = '';
  // Attach an event listener to handle potential data stream errors during transmission
  req.on('error', () => {
    // Set the HTTP response header to status 400 Bad Request with JSON content type
    res.writeHead(400, { 'Content-Type': 'application/json' });
    // Send a JSON response informing the client that the incoming stream was abruptly broken
    res.end(JSON.stringify({ error: 'Stream interrupted' }));
  });
  // Attach an event listener that triggers whenever a raw chunk of data arrives from the client
  req.on('data', (chunk) => {
    // Convert the binary buffer chunk to a string and append it to the body variable
    body += chunk.toString();
  });
  // Attach an event listener that fires once the entire request stream has finished arriving
  req.on('end', async () => {
    // Begin a try block inside the callback to catch parsing or database addition errors
    try {
      // Check if the compiled body string is empty or contains nothing but whitespace
      if (!body.trim()) {
        // Set the HTTP response header to status 400 Bad Request with JSON content type
        res.writeHead(400, { 'Content-Type': 'application/json' });
        // Send a JSON message indicating that no payload data was delivered
        res.end(JSON.stringify({ error: 'Missing request body payload' }));
        // Exit the stream callback function early
        return;
      }
      // Parse the completed string body into a usable JavaScript object
      const payload = JSON.parse(body);
      // Wait for the asynchronous addTask function to save the new task using data from the payload
      const newTask = await addTask(payload.description, payload.dueDate);
      // Set the HTTP response header to status 201 Created with JSON content type
      res.writeHead(201, { 'Content-Type': 'application/json' });
      // Send the newly created task object back to the client as a JSON string
      res.end(JSON.stringify(newTask));
      // Catch any errors resulting from malformed JSON parsing or task saving failures
    } catch (error) {
      // Set the HTTP response header to status 400 Bad Request with JSON content type
      res.writeHead(400, { 'Content-Type': 'application/json' });
      // Send a JSON string showing the exact error message or a generic fallback description
      res.end(
        JSON.stringify({ error: error.message || 'Malformed JSON payload' }),
      );
    }
  });
}

// Export a function to handle incoming HTTP PUT requests for updating an existing task
export function handlePutTask(req, res, taskId) {
  // Initialize an empty string variable to accumulate incoming raw request body data chunks
  let body = '';
  // Attach an event listener that triggers whenever a raw chunk of data arrives from the client
  req.on('data', (chunk) => {
    // Convert the binary buffer chunk to a string and append it to the body variable
    body += chunk.toString();
  });
  // Attach an event listener that fires once the entire request stream has finished arriving
  req.on('end', async () => {
    // Begin a try block inside the callback to catch parsing, validation, or database update errors
    try {
      // Check if the compiled body string is empty or contains nothing but whitespace
      if (!body.trim()) {
        // Set the HTTP response header to status 400 Bad Request with JSON content type
        res.writeHead(400, { 'Content-Type': 'application/json' });
        // Send a JSON message indicating that no update data was delivered
        res.end(JSON.stringify({ error: 'Empty update payload received' }));
        // Exit the stream callback function early
        return;
      }
      // Parse the completed string body into a usable JavaScript object containing update values
      const payload = JSON.parse(body);
      // Cast the incoming route parameter taskId string into a clean number format
      const numericId = Number(taskId);

      // Check if the description property was explicitly provided in the client payload
      if (payload.description !== undefined)
        // Wait for the asynchronous updateTask function to save the new description text
        await updateTask(numericId, payload.description);
      // Check if the status property was explicitly provided in the client payload
      if (payload.status !== undefined)
        // Wait for the asynchronous updateTaskStatus function to modify the task state
        await updateTaskStatus(numericId, payload.status);

      // Wait for the asynchronous loadTasks function to fetch the freshly modified dataset
      const tasks = await loadTasks();
      // Locate the exact task inside the updated array that matches our requested numeric ID
      const updatedTask = tasks.find((t) => t.id === numericId);

      // Set the HTTP response header to status 200 OK with JSON content type
      res.writeHead(200, { 'Content-Type': 'application/json' });
      // Send the newly modified task object back to the client as a JSON string
      res.end(JSON.stringify(updatedTask));
      // Catch any errors resulting from malformed JSON parsing or database update operational faults
    } catch (error) {
      // Set the HTTP response header to status 400 Bad Request with JSON content type
      res.writeHead(400, { 'Content-Type': 'application/json' });
      // Send a JSON string showing the specific validation message or a generic fallback description
      res.end(
        JSON.stringify({
          error: error.message || 'Validation or processing fault',
        }),
      );
    }
  });
}

// Export an asynchronous function to handle HTTP DELETE requests for removing a task
export async function handleDeleteTask(res, taskId) {
  // Begin a try block to trap potential database connection or missing record errors
  try {
    // Cast the incoming route parameter taskId string into a clean number format
    const numericId = Number(taskId);
    // Wait for the asynchronous deleteTask helper to remove the record matching this ID from storage
    await deleteTask(numericId);
    // Set the HTTP response header to status 200 OK with JSON content type
    res.writeHead(200, { 'Content-Type': 'application/json' });
    // Send a JSON object declaring success along with a clear confirmation message
    res.end(
      JSON.stringify({ success: true, message: `Task ${numericId} removed` }),
    );
    // Catch any errors if the database deletion routine fails or the item does not exist
  } catch (error) {
    // Set the HTTP response header to status 404 Not Found with JSON content type
    res.writeHead(404, { 'Content-Type': 'application/json' });
    // Send a JSON string displaying the specific rejection message or a generic fallback note
    res.end(JSON.stringify({ error: error.message || 'Task not found' }));
  }
}
