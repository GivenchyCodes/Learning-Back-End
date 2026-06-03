//TASK 1: Event Loop Video Summary
// - call stack: this can be seen as LIFO to handle a thread running function.
// - Runtime ApIs: it has to do with synchronous and asynchrounous background taasks handled by Web APIs or Node.js.
// - the callback queue: this are FIFO threads waiting line of callbacks ready to run.
// - Event loop: this manages the flow of all these processes by pushing queues to empty stack.

//   All these mentioned above fit each other because they have their hierarchi scopes of workflow from "Microtask to Macrotask to Promise. so that sync code run immediately on the call stack, while async tasks are send to runtime APIs / when they finish, their callbacks enter the callback queue / then the event loop continuously checks the call stack and the moment it is empty, it pushes the next queued callback onto the stack to execute.

//    TASK 2: Simulated Asynchronous File Reader

//  * Simulates reading a local file asynchronously using standard environment timers.
//  * Utilizes the Node.js standard error-first callback signature.
//  *
//  * @param {string} filename - The name of the file targeted for ingestion.
//  * @param {function} callback - An error-first callback function: (error, result).

const readFileSimulated = (filename, callback) => {
  // Use a Runtime API (timer macrotask) to mimic a background non-blocking operation
  setTimeout(() => {
    if (!filename) {
      const errorObject = new Error(
        'File read error: A valid filename must be specified.',
      );
      return callback(errorObject, null);
    }

    // Modernized using template literals
    const fakeFileContents = `Raw contents of ${filename}: {"userID": 101, "points": 450}`;
    // Execute callback in standard error-first style
    callback(null, fakeFileContents);
  }, 1000); // 1-second delay
};

//TASK 3: Callback Hell Chaining Pipeline
// Simulated data processing step. Takes 0.5 seconds.

const processDataSimulated = (rawData, callback) => {
  setTimeout(() => {
    if (!rawData) {
      return callback(
        new Error('Processing error: No raw data received.'),
        null,
      );
    }
    // Modernized using template literals
    const processedData = `${rawData.toUpperCase()} [PROCESSED]`;
    callback(null, processedData);
  }, 500);
};

// Simulated database saving step. Takes 0.5 seconds.
const saveDataSimulated = (processedData, callback) => {
  setTimeout(() => {
    if (!processedData) {
      return callback(
        new Error('Save error: No processed data received to write.'),
        null,
      );
    }
    const saveStatus = `Database Save Status: 200 OK (Saved data payload successfully)`;
    callback(null, saveStatus);
  }, 500);
};

// Execution Chain Exposing Callback Hell
console.log(' Starting Sequential Callback Chain');

// Step 1: Read the file
readFileSimulated('user-profile.json', (err1, fileData) => {
  if (err1) {
    console.error(`Step 1 Failed: ${err1.message}`);
    return;
  }

  // Nesting Level 2: Process the retrieved file data
  processDataSimulated(fileData, (err2, upperData) => {
    if (err2) {
      console.error(`Step 2 Failed: ${err2.message}`);
      return;
    }

    // Nesting Level 3: Save the processed result to the database
    saveDataSimulated(upperData, (err3, finalStatus) => {
      if (err3) {
        console.error(`Step 3 Failed: ${err3.message}`);
        return;
      }

      // Final confirmation buried deep inside the pyramid chain
      console.log('\n[SUCCESS] Entire workflow finished smoothly!');
      console.log(finalStatus);
      console.log('Chain Sequence Complete \n');
    });
  });
});

/*
  COMMENT ON READING NESTED CALLBACK HELL CODE:
  - Reading this script feels mentally draining and straining to follow.
  - The operational logic steps actively crawl horizontally across the screen, forming a massive,
  deeply indented pyramid of closing braces and parentheses (`    });`).
  - Tracking variable definitions across multiple lexical scopes gets messy quickly, and duplicating
  the error handling structures (`if (err)`) at every single level feels untidy and increases bugs.
*/
