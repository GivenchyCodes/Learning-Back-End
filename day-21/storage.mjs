import fs from 'fs/promises';
import path from 'path';

const FILE_PATH = path.join(process.cwd(), 'tasks.json');

/**
 * Ensures the JSON database file exists before reading.
 */
async function ensureFileExists() {
  try {
    await fs.access(FILE_PATH);
  } catch {
    await fs.writeFile(FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
  }
}

/**
 * Loads tasks array from JSON file.
 */
export async function loadTasks() {
  await ensureFileExists();
  const data = await fs.readFile(FILE_PATH, 'utf-8');
  return JSON.parse(data || '[]');
}

/**
 * Saves tasks array back to JSON file.
 */
export async function saveTasks(tasks) {
  await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2), 'utf-8');
}
