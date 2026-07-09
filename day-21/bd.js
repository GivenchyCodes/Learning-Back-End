// Import promise-wrapped filesystem modules to support non-blocking asynchronous I/O operations
import fs from 'node:fs/promises';
// Import Node's path engine utility to connect folder paths accurately across different operating systems
import path from 'node:path';

// Define an absolute storage folder tracking address for backup storage files within your root project directory
const BACKUP_DIR = path.join(process.cwd(), 'backups');
// Define retention policy boundary rule in milliseconds (7 days = 7 days * 24 hours * 60 mins * 60 secs * 1000 ms)
const MAX_BACKUP_AGE_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Day 25 Maintenance Utility: Scans your backups directory and purges snapshots older than 7 days.
 */
export async function rotateOldBackups() {
  // Start a try block to handle any unexpected disk reading errors gracefully without crashing the app
  try {
    // Verify if the backups folder directory physically exists before attempting to read files inside it
    await fs.access(BACKUP_DIR);

    // Read all contents and file names inside the backup folder as an array of strings
    const files = await fs.readdir(BACKUP_DIR);
    // Capture the current system time in unix milliseconds to use as a baseline for age calculations
    const now = Date.now();

    // Loop through every single file string item captured inside the backups folder array
    for (const file of files) {
      // Create a logical filter that only executes if the file starts with 'backup-' and ends with '.json'
      if (file.startsWith('backup-') && file.endsWith('.json')) {
        // Build the complete absolute system file path to target this individual backup file
        const filePath = path.join(BACKUP_DIR, file);

        // Extract the date segment from the filename string and convert path-safe dashes back into standard ISO colons
        // This converts 'backup-2026-07-01T11-18-56.json' into a clean parseable date string '2026-07-01T11:18:56'
        const datePart = file
          .replace('backup-', '')
          .replace('.json', '')
          .replace(/(\d{2})-(\d{2})-(\d{2}\.\d+Z)$/, '$1:$2:$3');

        // Parse the newly reconstructed ISO date string string into real unix millisecond numerical format
        const fileTimestamp = Date.parse(datePart);

        // Fallback conditional rule: If the filename was altered or string parsing fails completely resulting in NaN
        if (isNaN(fileTimestamp)) {
          // Fall back to reading the file's raw physical disk metadata statistics attributes instead
          const stats = await fs.stat(filePath);
          // Check if the current time minus the file's last modified timestamp exceeds our 7-day retention limit
          if (now - stats.mtimeMs > MAX_BACKUP_AGE_MS) {
            // Asynchronously delete the expired file from the host operating system drive
            await fs.unlink(filePath);
            // Write a descriptive cleanup completion trace message directly out to the standard stdout terminal stream
            process.stdout.write(
              ` 🧹 Expired backup removed (fallback stats): ${file}\n`,
            );
          }
          // Skip the rest of the loop logic for this item and jump directly to evaluating the next file in line
          continue;
        }

        // Standard comparison check: Determine if the calculated file timestamp age is older than our 7-day cutoff limit
        if (now - fileTimestamp > MAX_BACKUP_AGE_MS) {
          // Delete the historical snapshot file asynchronously using non-blocking file removal operations
          await fs.unlink(filePath);
          // Notify the terminal operator that an expired backup file was successfully purged from storage tracking
          process.stdout.write(
            ` 🧹 Expired backup snapshot removed: ${file}\n`,
          );
        }
      }
    }
    // Intercept folder missing faults or file reading boundary exceptions inside the catch safety cage
  } catch (error) {
    // If the error code signifies the directory was missing entirely (ENOENT), return cleanly without crashing
    if (error && error.code === 'ENOENT') return;
    // Extract the clear text message from the caught error object or cast a generic string message fallback
    const errorMessage = error instanceof Error ? error.message : String(error);
    // Write out an explicit warning notification tracking alert straight into the terminal stderr stream window
    process.stderr.write(
      ` ⚠️ Backup rotation encountered an error: ${errorMessage}\n`,
    );
  }
}

/**
 * Day 24 Enhanced Backup Utility Engine (Preserved and fully integrated).
 */
export default async function createDatabaseBackup() {
  // Map out the targeted production database tracking file segment that needs state protection copies
  const sourceFile = path.join(process.cwd(), 'tasks.json');
  // Attempt to execute core data replication processes within a try safety block
  try {
    // Verify if the base production data file exists before attempting any system snapshot copy procedures
    await fs.access(sourceFile);
    // Secure folder structures; build the backups folder recursively if it is missing from the system path
    await fs.mkdir(BACKUP_DIR, { recursive: true });

    // Clean up colon punctuation signs from the current time ISO string to prevent operating system path file errors
    const dateStamp = new Date().toISOString().replace(/:/g, '-');
    // Combine folder paths to build a distinct timestamped file target snapshot signature path
    const backupFile = path.join(BACKUP_DIR, `backup-${dateStamp}.json`);

    // Execute an efficient non-blocking system-level file duplicate command stream operation
    await fs.copyFile(sourceFile, backupFile);
    // Write a success update log tracking indicator out to the console interface window
    process.stdout.write(
      ` 💾 Local copy backed up successfully: ${path.basename(backupFile)}\n`,
    );
    // Return true to verify that historical data parameters are safely recorded
    return true;
    // Catch filesystem issues like a missing tasks.json base file
  } catch (error) {
    // If the error indicates that tasks.json does not exist yet, catch it and return false cleanly
    if (error && error.code === 'ENOENT') return false;
    // Normalize the captured error object down to a text string format layout
    const errorMessage = error instanceof Error ? error.message : String(error);
    // Stream an explicit failure alert notification track straight out to the standard error console window
    process.stderr.write(` ⚠️ Backup aborted: ${errorMessage}\n`);
    // Bubble up catastrophic system-level process errors to the main parent application program loop
    throw error;
  }
}
