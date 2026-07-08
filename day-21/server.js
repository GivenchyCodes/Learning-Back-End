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
      if (payload.description !== undefined) {
        // Wait for the asynchronous updateTask function to save the new description text
        await updateTask(numericId, payload.description);
      }

      // Check if the status property was explicitly provided in the client payload
      if (payload.status !== undefined) {
        // Wait for the asynchronous updateTaskStatus function to modify the task state
        await updateTaskStatus(numericId, payload.status);
      }

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
