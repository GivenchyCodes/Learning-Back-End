// Import the core filesystem module using promises for asynchronous operations
import fs from 'node:fs/promises'; // Import the promise-based file system module.
// Import Node's path utility to handle cross-platform directory formatting paths safely
import path from 'node:path'; // Import the path utility for cross-platform file paths.
// This blank line separates imports from logic.
// Calculate the absolute path targeting either the test file or the production store
const FILE_PATH = path.join(
  // Start building the absolute path to the data file.
  process.cwd(), // Extracts the current active working directory location path
  process.env.NODE_ENV === 'test' ? 'tasks.test.json' : 'tasks.json', // Checks environment state
); // Close the path.join function call.
// This blank line separates global constants from functions.
/**
 * Guarantees the database file exists physically on disk before read actions execution.
 */
async function ensureFileExists() {
  // Declare an asynchronous function to verify the file.
  try {
    // Start a try block to handle potential file errors.
    // Attempt system-level access to verify if the file location paths are open
    await fs.access(FILE_PATH); // Check if the target file is accessible.
  } catch (error) {
    // Catch errors if the file does not exist.
    // Intercept only missing file system error alerts signaled via the code ENOENT
    if (error.code === 'ENOENT') {
      // Check if the error means the file is missing.
      // Create a brand new blank structural database file holding an empty array layout
      await fs.writeFile(FILE_PATH, JSON.stringify([], null, 2), 'utf-8'); // Write a new file with an empty array.
    } else {
      // Handle other unexpected file system errors.
      // Bubble up any critical unexpected folder lock or permission denial code exceptions
      throw error; // Re-throw the error if it is not a missing file issue.
    } // Close the if-else error condition block.
  } // Close the try-catch block.
} // Close the ensureFileExists function.
// This blank line separates the file check from data cleanup.
/**
 * Normalizes uneven legacy objects or missing schemas into matching application shapes.
 */
function normalizeDataSchema(rawArray) {
  // Declare a function to sanitize the data array.
  // Establish a base dynamic tracking integer fallback index pointer
  let sequentialCounter = 1; // Initialize a counter to generate new task IDs.
  // Capture a uniform ISO time string stamp to fill missing record timestamps
  const nowISO = new Date().toISOString(); // Generate a fallback timestamp string for missing dates.
  // This blank line separates variable setup from loop logic.
  // Inspect existing records to isolate the current maximum sequential number
  rawArray.forEach((item) => {
    // Loop through every task in the raw array.
    // Filter out huge timestamps to prevent breaking standard sequence bounds
    if (item.id && item.id < 1000000000 && item.id >= sequentialCounter) {
      // Validate ID format and bounds.
      // Shift counter position past the highest registered numeric key safely
      sequentialCounter = item.id + 1; // Update the counter to be higher than the highest existing ID.
    } // Close the ID validation conditional block.
  }); // Close the raw data forEach loop.
  // This blank line separates ID analysis from data mapping.
  // Immutably structure every element into an absolute database format layout map
  return rawArray.map((task) => {
    // Map the raw tasks into a new normalized array.
    // Identify legacy timestamp configurations or empty record id values
    let finalId = task.id; // Store the current task ID in a temporary variable.
    if (!finalId || finalId > 1000000000) {
      // Check if the ID is missing or invalid.
      // Swap out the bad identifier with the next calculated integer layout slot
      finalId = sequentialCounter; // Assign the next valid sequential ID to the task.
      // Increment the shared file track index tracker counter right away
      sequentialCounter += 1; // Increment the counter for the next missing ID.
    } // Close the ID correction conditional block.
    // This blank line separates ID fixes from description fixes.
    // Convert old alternate string properties down into a uniform key descriptor
    const finalDescription = task.description || task.title || 'Untitled Task'; // Fall back to title or default text.
    // This blank line separates description fixes from status fixes.
    // Map boolean completion variables into structural string state lifecycle tokens
    let finalStatus = task.status || 'todo'; // Default to 'todo' if no status exists.
    if (task.completed !== undefined) {
      // Check if the old boolean property exists.
      // Convert boolean true settings down into explicit "done" status assignments
      finalStatus = task.completed ? 'done' : 'todo'; // Map true to 'done' and false to 'todo'.
    } // Close the boolean check conditional block.
    // This blank line separates value resolution from object return.
    // Return the clean, normalized, spec-compliant model structure instance
    return {
      // Construct and return the standardized task object.
      id: Number(finalId), // Ensure the tracking sequence id is strictly an integer type
      description: finalDescription.trim(), // Remove accidental leading or trailing white spaces
      status: finalStatus, // Set uniform lifecycle status keys
      createdAt: task.createdAt || nowISO, // Preserve original date parameters or apply baseline stamps
      updatedAt: task.updatedAt || nowISO, // Track time adjustments uniformly
      ...(task.dueDate ? { dueDate: task.dueDate } : {}), // Add dueDates optionally if populated
    }; // Close the returned task object literal.
  }); // Close the rawArray.map method call.
} // Close the normalizeDataSchema function.
// This blank line separates normalization from file loading.
/**
 * Loads the core data matrix array directly from the absolute file-system path.
 */
export async function loadTasks() {
  // Export an async function to read tasks from disk.
  // Confirm the tracking file is physically present before accessing streaming reads
  await ensureFileExists(); // Run the helper function to make sure the file exists.
  // Fetch the full file contents safely using clean UTF-8 text string formatting
  const data = await fs.readFile(FILE_PATH, 'utf-8'); // Read the JSON file content as pure text.
  // De-serialize raw JSON data strings back into a live JavaScript array list layout
  const parsed = JSON.parse(data || '[]'); // Safely parse the text file or fallback to an empty list.
  // This blank line separates parsing from normalization.
  // Run normalization routines to protect the system against layout changes
  const normalized = normalizeDataSchema(parsed); // Standardize the parsed objects array structure.
  // This blank line separates normalization from save-back checks.
  // Detect if any elements were fixed or adjusted during the normalization run
  if (JSON.stringify(parsed) !== JSON.stringify(normalized)) {
    // Check if the database structure changed.
    // Immediately overwrite the disk file with the clean normalized model collection
    await saveTasks(normalized); // Write the cleaned data back to disk immediately.
  } // Close the change-detection conditional block.
  // This blank line separates the save logic from the final output.
  // Return the verified, clean, unified task entries data structure array
  return normalized; // Return the cleaned tasks list to the caller.
} // Close the loadTasks function.
// This blank line separates loading from saving.
/**
 * Overwrites the persistent storage file with the latest dataset configuration array.
 */
export async function saveTasks(tasks) {
  // Export an async function to save tasks to disk.
  // Write the JavaScript object array out to the file with a clean 2-space indentation format
  await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2), 'utf-8'); // Overwrite the file with formatted JSON data.
} // Close the saveTasks function.
