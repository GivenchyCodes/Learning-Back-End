// Import the core filesystem module from Node.js using promises for cleaner asynchronous code
import fs from 'node:fs/promises';
// Import Node's path utility to handle cross-platform file paths seamlessly (Mac, Windows, Linux)
import path from 'node:path';

// Combine the current working directory path with the target database name to create an absolute path
const FILE_PATH = path.join(
  process.cwd(),
  process.env.NODE_ENV === 'test' ? 'tasks.test.json' : 'tasks.json',
);

/**
 * Ensures the JSON database file exists before reading.
 */
async function ensureFileExists() {
  try {
    // Attempt to access the file; if this succeeds, the file exists and we do nothing
    await fs.access(FILE_PATH);
  } catch (error) {
    // Only generate a new file if the error indicates it does not exist (ENOENT)
    if (error.code === 'ENOENT') {
      await fs.writeFile(FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
    } else {
      // Re-throw any other critical system permission errors to prevent silent data loss
      throw error;
    }
  }
}

/**
 * Loads tasks array from JSON file.
 */
export async function loadTasks() {
  // Call our safety helper function to guarantee the file physically exists first
  await ensureFileExists();
  // Read the contents of the file entirely as a standardized UTF-8 text string
  const data = await fs.readFile(FILE_PATH, 'utf-8');
  // Convert the raw text string back into a live JavaScript array; default to an empty array if blank
  return JSON.parse(data || '[]');
}

/**
 * Saves tasks array back to JSON file.
 */
export async function saveTasks(tasks) {
  // Convert the JavaScript array back into a readable string formatted with a 2-space indentation layout
  await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2), 'utf-8');
}
