// Import the loadTasks function from the local storage module to read existing tasks
import { loadTasks } from './storage.mjs';
// Import the saveTasks function from the local storage module to write tasks back to storage
import { saveTasks } from './storage.mjs';
// Import the database backup function from the local backup module as a default import
import createDatabaseBackup from './bd.js';

// Define an object containing ANSI escape sequences to apply colored and stylized formatting in the terminal console
const COLORS = {
  reset: '\x1b[0m', // Resets text formatting and color back to standard terminal default
  bold: '\x1b[1m', // Applies bold text formatting
  red: '\x1b[31m', // Sets text color to red
  green: '\x1b[32m', // Sets text color to green
  yellow: '\x1b[33m', // Sets text color to yellow
  cyan: '\x1b[36m', // Sets text color to cyan
  magenta: '\x1b[35m', // Sets text color to magenta
};

// Helper function to calculate the next unique numeric identifier for a new task
function getNextId(tasks) {
  // Return an ID of 1 if the tasks array is completely empty
  if (tasks.length === 0) return 1;
  // Extract all numeric IDs from the existing tasks array into a new array
  const ids = tasks.map((task) => task.id);
  // Find the highest ID number in the array using the spread operator and add 1 to it
  return Math.max(...ids) + 1;
}

// Exported function to determine if a task is overdue based on its due date and current completion status
export function isTaskOverdue(task) {
  // If the task is already finished or does not have a due date specified, it cannot be overdue
  if (task.status === 'done' || !task.dueDate) return false;

  // Create a new Date object representing the current point in time
  const today = new Date();
  // Normalize the current date to midnight (00:00:00.000) for a fair daily comparison
  today.setHours(0, 0, 0, 0);

  // Parse the task's due date string into a new Date object
  const due = new Date(task.dueDate);
  // Normalize the task's due date to midnight (00:00:00.000) for an accurate day-only comparison
  due.setHours(0, 0, 0, 0);

  // Return true if the normalized due date is strictly earlier than the normalized current date
  return due < today;
}

// Helper function to wrap status text in the appropriate ANSI color escape codes based on its value
function formatStatusColor(status) {
  // If the task is in 'todo' status, wrap it in red color tags
  if (status === 'todo') return `${COLORS.red}todo${COLORS.reset}`;
  // If the task is 'in-progress', wrap it in yellow color tags
  if (status === 'in-progress')
    return `${COLORS.yellow}in-progress${COLORS.reset}`;
  // If the task is completed ('done'), wrap it in green color tags
  if (status === 'done') return `${COLORS.green}done${COLORS.reset}`;
  // Return the status text unmodified if it does not match any recognized states
  return status;
}

// Exported function to render and print a structured, aligned grid table of tasks to the terminal
export function printTaskGrid(tasks) {
  // Write the table header names directly to standard output, adding padding spaces to align columns neatly
  process.stdout.write(
    `${'ID'.padEnd(5)} ${'Status'.padEnd(15)} ${'Due Date'.padEnd(12)} ${'Created At'.padEnd(20)} Description\n`,
  );
  // Write a horizontal separator line consisting of 90 dash characters underneath the headers
  process.stdout.write(`${'-'.repeat(90)}\n`);

  // Iterate over each individual task object in the tasks collection array
  tasks.forEach((task) => {
    // If the creation date exists, format it into a localized short date and time string; otherwise fallback to 'N/A'
    const createdDate = task.createdAt
      ? new Date(task.createdAt).toLocaleString(undefined, {
          dateStyle: 'short',
          timeStyle: 'short',
        })
      : 'N/A';

    // Store the task due date string, defaulting to a fallback string literal if no due date was assigned
    let displayDueDate = task.dueDate || 'No Date';
    // Get the colorized version of the task status text by calling the formatting helper function
    const statusText = formatStatusColor(task.status);
    // Reference the task description string for display customization
    let descriptionText = task.description;

    // Check if the current task is overdue by invoking the overdue validation checker
    if (isTaskOverdue(task)) {
      // Apply bold and red coloring text styling to the due date column display text
      displayDueDate = `${COLORS.bold}${COLORS.red}${displayDueDate}${COLORS.reset}`;
      // Apply bold and red coloring text styling to the description column display text
      descriptionText = `${COLORS.bold}${COLORS.red}${descriptionText}${COLORS.reset}`;
    }

    // Write out the fully assembled and correctly padded row line for the single task to standard output
    process.stdout.write(
      `${task.id.toString().padEnd(5)} ` +
        `[${statusText.padEnd(20)}] ` +
        `${displayDueDate.padEnd(21)} ` +
        `${createdDate.padEnd(20)} ` +
        `${descriptionText}\n`,
    );
  });
}

// Exported asynchronous function to validate input parameters and append a new task to the system
export async function addTask(description, dueDateArg) {
  // Validate that the description argument is present and does not consist solely of whitespace characters
  if (!description || !description.trim()) {
    // Throw an informative error exception to stop execution if task description verification fails
    throw new Error('Givens said Task description cannot be empty.');
  }

  // Initialize a placeholder variable to hold the final validated due date value
  let finalDueDate = null;

  // Process the due date if an optional value was provided to the function arguments
  if (dueDateArg) {
    // Remove leading and trailing whitespace from the provided due date string
    const trimmedDate = dueDateArg.trim();
    // Regular expression rule to match standard calendar year, month, and day structure (e.g. 2026-07-08)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    // Validate that the string passes the regex pattern match check AND can be successfully parsed into a real calendar date
    if (!dateRegex.test(trimmedDate) || Number.isNaN(Date.parse(trimmedDate))) {
      // Throw a structured error exception highlighting the required string sequence structure format rules
      throw new Error('Due date must match the format YYYY-MM-DD exactly.');
    }
    // Assign the cleaned, valid date string to the final storage variable
    finalDueDate = trimmedDate;
  }

  // Asynchronously generate a backup copy of the data tracking records before introducing any storage mutations
  await createDatabaseBackup();

  // Asynchronously retrieve the latest array of all current task storage rows from the local disk system
  const tasks = await loadTasks();
  // Get the current date and time formatted in a standard ISO 8601 string representation
  const now = new Date().toISOString();

  // Construct a new task literal entity populated with the validated properties and unique metadata states
  const newTask = {
    id: getNextId(tasks), // Generate the numeric unique identifier sequence for the new entry
    description: description.trim(), // Assign the cleaned description string with excess surrounding spacing removed
    status: 'todo', // Set the starting structural pipeline status tracking value to 'todo'
    createdAt: now, // Record the task registration date timestamp string
    updatedAt: now, // Set the modification tracking date timestamp matching the registration record
    dueDate: finalDueDate, // Attach the validated calendar target due date string value or null tracking reference
  };

  // Create a brand new combined array incorporating the old records alongside the newly configured record item
  const updatedTasks = [...tasks, newTask];
  // Asynchronously write the complete, updated list structure collection back into hard persistent file storage
  await saveTasks(updatedTasks);

  // Write a success confirmation log notice containing the generated task numeric id directly to the terminal stdout stream
  process.stdout.write(
    `Givens Said your Task added successfully (ID: ${newTask.id})\n`,
  );
  // Return the newly constructed task object instance block back to the original function execution point
  return newTask;
}

// Export an asynchronous function to delete a task by its ID
export async function deleteTask(id) {
  // Convert the input ID into a standard number format
  const numericId = Number(id);
  // Create a backup of the current database before making any changes
  await createDatabaseBackup();

  // Load the current list of tasks from storage
  const tasks = await loadTasks();
  // Store the total number of tasks before the deletion process
  const initialLength = tasks.length;

  // Create a new array excluding the task that matches the target ID
  const filteredTasks = tasks.filter((t) => t.id !== numericId);

  // If the array length didn't change, the target task did not exist
  if (filteredTasks.length === initialLength) {
    // Throw an error indicating the specified task was not found
    throw new Error(`Task with ID ${numericId} not found.`);
  }

  // Save the updated list of tasks back to storage
  await saveTasks(filteredTasks);
  // Print a success message directly to the console output stream
  process.stdout.write(`Task ${numericId} deleted successfully.\n`);
}

// Export an asynchronous function to update a task's text description
export async function updateTask(id, newDescription) {
  // Check if the new description is missing, empty, or only spaces
  if (!newDescription || !newDescription.trim()) {
    // Throw an error preventing empty descriptions from being saved
    throw new Error('Task description cannot be empty.');
  }

  // Convert the input ID into a standard number format
  const numericId = Number(id);
  // Create a backup of the current database before making any changes
  await createDatabaseBackup();

  // Load the current list of tasks from storage
  const tasks = await loadTasks();
  // Check if at least one task in the list matches the target ID
  const taskExists = tasks.some((t) => t.id === numericId);

  // If no matching task is found in the current list
  if (!taskExists) {
    // Throw an error indicating the specified task was not found
    throw new Error(`Task with ID ${numericId} not found.`);
  }

  // Generate a new array where the target task gets updated details
  const updatedTasks = tasks.map((task) => {
    // Return unchanged tasks exactly as they are
    if (task.id !== numericId) return task;
    // Return a new object with the updated description and timestamp
    return {
      ...task, // Copy all existing properties of the task
      description: newDescription.trim(), // Apply the trimmed description
      updatedAt: new Date().toISOString(), // Record the current date and time
    };
  });

  // Save the modified task list back to storage
  await saveTasks(updatedTasks);
  // Print a success message directly to the console output stream
  process.stdout.write(`Task ${numericId} updated successfully.\n`);
}

// Export an asynchronous function to update the execution status of a task
export async function updateTaskStatus(id, newStatus) {
  // Convert the input ID into a standard number format
  const numericId = Number(id);
  // Create a backup of the current database before making any changes
  await createDatabaseBackup();

  // Load the current list of tasks from storage
  const tasks = await loadTasks();
  // Check if at least one task in the list matches the target ID
  const taskExists = tasks.some((t) => t.id === numericId);

  // If no matching task is found in the current list
  if (!taskExists) {
    // Throw an error indicating the specified task was not found
    throw new Error(`Task with ID ${numericId} not found.`);
  }

  // Generate a new array where the target task gets an updated status
  const updatedTasks = tasks.map((task) => {
    // Return unchanged tasks exactly as they are
    if (task.id !== numericId) return task;
    // Return a new object with the updated status and timestamp
    return {
      ...task, // Copy all existing properties of the task
      status: newStatus, // Apply the new status value
      updatedAt: new Date().toISOString(), // Record the current date and time
    };
  });

  // Save the modified task list back to storage
  await saveTasks(updatedTasks);
  // Print a success message showing the new status to the console output stream
  process.stdout.write(
    `Task ${numericId} marked as ${newStatus} successfully.\n`,
  );
}

// Export an asynchronous function to filter and display the tasks
export async function listTasks(statusFilter) {
  // Load the complete list of tasks from storage
  const allTasks = await loadTasks();
  // Initialize a mutable variable to hold the tasks destined for display
  let displayTasks = allTasks;

  // Check if a specific filter argument was provided by the user
  if (statusFilter) {
    // Handle the custom 'overdue' filter condition separately
    if (statusFilter === 'overdue') {
      // Filter the list using an external helper function to find overdue tasks
      displayTasks = allTasks.filter((t) => isTaskOverdue(t));
    } else {
      // Validate that the filter matches one of the accepted standard statuses
      if (!['todo', 'in-progress', 'done'].includes(statusFilter)) {
        // Throw an error if an unrecognized filter string is passed
        throw new Error(
          "Invalid status. Use 'todo', 'in-progress', 'done', or 'overdue'.",
        );
      }
      // Filter the list to include only tasks matching the specific status
      displayTasks = allTasks.filter((t) => t.status === statusFilter);
    }
  }

  // Check if the final filtered list contains no tasks
  if (displayTasks.length === 0) {
    // Print a fallback message directly to the console output stream
    process.stdout.write('No tasks found.\n');
    // Exit the function early since there is nothing left to display
    return;
  }

  // Pass the filtered tasks to a helper function that prints them in a grid
  printTaskGrid(displayTasks);
}

// Defines and exports an asynchronous function to search tasks by a keyword string
export async function searchTasks(keyword) {
  // Fetches the list of all tasks from the data source asynchronously
  const tasks = await loadTasks();
  // Converts the search keyword to lowercase for a case-insensitive match
  const searchNormalized = keyword.toLowerCase();

  // Filters the tasks array to find items whose description contains the keyword
  const matchedTasks = tasks.filter((task) =>
    task.description.toLowerCase().includes(searchNormalized),
  );

  // Checks if no tasks matched the search criteria
  if (matchedTasks.length === 0) {
    // Prints a message to standard output indicating no results were found
    process.stdout.write(`No tasks found matching keyword: "${keyword}"\n`);
    // Exits the function early since there are no tasks to display
    return;
  }

  // Prints a stylized header to standard output showing the search keyword
  process.stdout.write(
    `${COLORS.cyan}Search Results for keyword: "${keyword}"${COLORS.reset}\n\n`,
  );
  // Invokes a helper function to display the matched tasks in a grid format
  printTaskGrid(matchedTasks);
}

// Defines and exports an asynchronous function to calculate and display task statistics
export async function printStats() {
  // Fetches the list of all tasks from the data source asynchronously
  const tasks = await loadTasks();
  // Counts the total number of tasks in the database
  const total = tasks.length;

  // Checks if the task database is empty
  if (total === 0) {
    // Prints a message to standard output indicating no metrics are available
    process.stdout.write(
      'No tracking metrics accessible. Database collection array is empty.\n',
    );
    // Exits the function early since there is no data to analyze
    return;
  }

  // Counts how many tasks currently have a 'todo' status
  const todoCount = tasks.filter((t) => t.status === 'todo').length;
  // Counts how many tasks currently have an 'in-progress' status
  const inProgressCount = tasks.filter(
    (t) => t.status === 'in-progress',
  ).length;
  // Counts how many tasks currently have a 'done' status
  const doneCount = tasks.filter((t) => t.status === 'done').length;
  // Counts how many tasks have missed their deadline using a helper function
  const overdueCount = tasks.filter((t) => isTaskOverdue(t)).length;
  // Calculates the percentage of completed tasks, rounded to one decimal place
  const completeRatio = ((doneCount / total) * 100).toFixed(1);

  // Prints the dashboard title block with bold and cyan color formatting
  process.stdout.write(
    `\n${COLORS.bold}${COLORS.cyan}📊 TASK ANALYTICS STATS DASHBOARD${COLORS.reset}\n`,
  );
  // Prints a double-line separator of 45 equal signs for visual structure
  process.stdout.write(`${'='.repeat(45)}\n`);
  // Prints the absolute total number of tasks found in the records
  process.stdout.write(`  Absolute Records Total : ${total}\n`);
  // Prints the number of pending tasks formatted in red color
  process.stdout.write(
    `  Pending Status (Todo)  : ${COLORS.red}${todoCount}${COLORS.reset}\n`,
  );
  // Prints the number of active tasks formatted in yellow color
  process.stdout.write(
    `  Running (In-Progress)  : ${COLORS.yellow}${inProgressCount}${COLORS.reset}\n`,
  );
  // Prints the number of completed tasks formatted in green color
  process.stdout.write(
    `  Finalized (Done)       : ${COLORS.green}${doneCount}${COLORS.reset}\n`,
  );
  // Prints the number of past-due tasks formatted in bold red color
  process.stdout.write(
    `  Overdue Deadline Items : ${COLORS.bold}${COLORS.red}${overdueCount}${COLORS.reset}\n`,
  );
  // Prints a single-line separator of 45 dashes to divide the metrics sections
  process.stdout.write(`${'-'.repeat(45)}\n`);
  // Prints the overall completion rate percentage formatted in bold magenta color
  process.stdout.write(
    `  Execution Progress Ratio: ${COLORS.bold}${COLORS.magenta}${completeRatio}% Complete${COLORS.reset}\n\n`,
  );
}
