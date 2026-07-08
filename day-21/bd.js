// Import promise-wrapped filesystem modules to support non-blocking I/O operations
import fs from 'node:fs/promises';
// Import Node's path engine utility to connect folder segments accurately
import path from 'node:path';

// Define an absolute storage folder tracking address for backup storage files
const BACKUP_DIR = path.join(process.cwd(), 'backups');

/**
 * Day 24 Enhanced Backup Utility Engine.
 */
export default async function createDatabaseBackup() {
  // Map out the targeted production file segment that needs state protection
  const sourceFile = path.join(process.cwd(), 'tasks.json');

  try {
    // Verify if the production file exists before executing any snapshot copies
    await fs.access(sourceFile);
    // Secure the folder structure; build the backups folder recursively if it is missing
    await fs.mkdir(BACKUP_DIR, { recursive: true });

    // Clean up colon punctuation signs from the time string to prevent file system path errors
    const dateStamp = new Date().toISOString().replace(/:/g, '-');
    // Combine folder paths to build a distinct timestamped file target signature
    const backupFile = path.join(BACKUP_DIR, `backup-${dateStamp}.json`);

    // Execute an efficient system-level file duplicate command stream
    await fs.copyFile(sourceFile, backupFile);
    // Write a success update log tracking indicator out to the console interface
    process.stdout.write(
      `💾 Local copy backed up successfully: ${path.basename(backupFile)}\n`,
    );
    // Return true to verify that historical data parameters are safely recorded
    return true;
  } catch (error) {
    // Safe property check prevents runtime crashes if 'error' is null or undefined
    if (error && error.code === 'ENOENT') return false;

    // Fallback message ensures code works even if error.message doesn't exist
    const errorMessage = error instanceof Error ? error.message : String(error);
    // Notify terminal users regarding missing permissions or full disk space faults
    process.stderr.write(`⚠️ Backup aborted: ${errorMessage}\n`);
    // Bubble up catastrophic system-level process errors to the main program loop
    throw error;
  }
}
