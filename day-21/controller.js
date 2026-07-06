import {
  addTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
} from './taskManager.mjs';
import { loadTasks } from './storage.mjs';

/**
 * Endpoint Controller: GET /tasks
 * Fetches and sends back all storage task entities.
 */
export async function handleGetTasks(req, res) {
  try {
    const tasks = await loadTasks();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
}

/**
 * Endpoint Controller: POST /tasks
 * Processes incoming data streams to add a task with an optional due date.
 */
export function handlePostTask(req, res) {
  let body = '';
  req.on('error', () => {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Stream interrupted' }));
  });
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', async () => {
    try {
      if (!body.trim()) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing request body payload' }));
        return;
      }

      const payload = JSON.parse(body);

      // Utilize your taskManager.mjs core validation engine
      const newTask = await addTask(payload.description, payload.dueDate);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newTask));
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({ error: error.message || 'Malformed JSON payload' }),
      );
    }
  });
}

/**
 * Endpoint Controller: PUT /tasks/:id
 * Immutably updates descriptions or status flags on live items.
 */
export function handlePutTask(req, res, taskId) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', async () => {
    try {
      if (!body.trim()) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Empty update payload received' }));
        return;
      }

      const payload = JSON.parse(body);

      // Branch logic depending on what properties are supplied inside the body payload
      if (payload.description !== undefined) {
        await updateTask(taskId, payload.description);
      }
      if (payload.status !== undefined) {
        await updateTaskStatus(taskId, payload.status);
      }

      // Load tasks to pull down the newly modified entry representation
      const tasks = await loadTasks();
      const updatedTask = tasks.find((t) => t.id === taskId);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updatedTask));
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          error: error.message || 'Validation or processing fault',
        }),
      );
    }
  });
}

/**
 * Endpoint Controller: DELETE /tasks/:id
 * Removes a task item completely from persistence.
 */
export async function handleDeleteTask(res, taskId) {
  try {
    await deleteTask(taskId);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({ success: true, message: `Task ${taskId} removed` }),
    );
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message || 'Task not found' }));
  }
}
