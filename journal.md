// Write today's date
April/14/2026

// 3–5 sentences about what you set up and any questions you have.

1. I Understand what a code editor (VSCODE), a runtime (NODE), and a package manager (PNPM) are and how they relate on my workspace and environment.
2. I learnt how to check their version to be sure if they are installed on my machine.
3. I also set VScode as my primary editor with: git config --global core.editor "code --wait"

// Question

1. Node.js runtime procedure, what is the difference for "C" runtime? I need clearification on how they both operate differently. i am comfused because i know "C" uses compiler. More clearification will help my cognitive asssimilation from tanglingly.

//what i learnt About Node.js
i did as instructed, i went to the official site and click on "About" and i understood that Upon each connection, the callback is fired, but if there is no work to be done, Node.js will sleep (this happend two - three weeks back when the firm alarm triggered but the speaker didnt respond). Also i learnt about: . ESM (ECMAScript Modules: import { createServer } from 'node:http';
) and CJS (CommonJS: const { createServer } = require('node:http');
)

//Configuration
const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
res.statusCode = 200;
res.setHeader('Content-Type', 'text/plain');
res.end('Hello World');
});

server.listen(port, hostname, () => {
console.log(`Server running at http://${hostname}:${port}/`);
});

// Conclusion (My Remark)
learning has taken place perharbs (80%)

### Day 2 — Command Line Fundamentals

# Terminal & CLI Fundamentals

This vscode current repository documents, helps my mastery of the command line interface, by focusing on file system / terminal navigation, manipulation, and permission management.

## File System Navigation

- `pwd`: Print Working Directory (shows exactly where you are).
- `ls`: List files and directories. Use `ls -la` to see hidden files and details.
- `cd`: Change directory.
  - `cd ..` moves up one level.
  - `cd ~` moves to the home directory.

## File Manipulation & Utilities

During this session, I practiced creating a structured backend environment:

- **Creation:** Used `mkdir -p` to create nested directory trees.
- **Viewing:** Used `cat` to read files, `head`/`tail` for snippets, and `echo` to write text.
- **Searching:** Used `grep` to filter text within files.
- **Management:** Used `cp` (copy), `mv` (move/rename), and `rm` (remove).

## Directory Structure Created:

```
learning-backend/
├── projects/
│   ├── project-01/
│   └── project-02/
├── notes/
│   └── cli-commands.md  <-- Contains 10+ command definitions
└── scripts/
```

## Permissions & chmod

- Understanding chmod 755 (The "Golden Standard"):
- 7 (User): Read (4) + Write (2) + Execute (1). Full control.
- 5 (Group): Read (4) + Execute (1). Can see and run, but not edit.
- 5 (Others): Read (4) + Execute (1). Can see and run, but not edit.
- Advanced Concepts
- Piping (|): Taking the output of one command and sending it to another.
- Example: ls | grep ".js" finds only JavaScript files in a list.
- Redirection (>>): Appending output to the end of a file without overwriting it.

## In Conclusion

This Day 2 review covers command-line fundamentals, focusing on navigating file systems, manipulating files with tools like touch and mv, and utilizing grep for filtering. Key concepts include managing file permissions with chmod and utilizing pipes (|) to streamline workflows.

## Question

1. I understand `chmod` but i need more explainations with the usage on real-project.

This guide covers everything you’ve been working on, from archive types to the permissions needed to run your scripts.

## DAY 3, I STUDIED MORE ABOUT ".SH" & "CHMOD" (Archive & Permissions Guide)

## 1. Archive Formats Explained

- .tar (Tape Archive): A "container" that bundles many files into one without making them smaller (no compression).
- .tar (Tape Archive): Bundles files into one "container." By itself, it does not compress.
- .zip: A universal format that both bundles and compresses files. It is the most compatible across Windows and Linux.
- .zip: The most compatible format across Windows, Mac, and Linux.
- .rar / .7z: High-compression formats that make files much smaller than .zip. While powerful, they often require extra tools like unrar or p7zip to be installed on Linux.
- .rar & .7z: High-efficiency compression. .7z is open-source, while .rar is proprietary and usually requires extra tools like p7zip-rar or unrar.
- .iso: A disk image format typically used for software installers or operating systems.
- .iso: A disk image format, essentially a complete copy of an optical disc. [1, 2, 3, 4, 5, 6]
- .rpm: A package file used for installing software on Red Hat-based Linux systems.
- .rpm: A package format specifically for software installation on Red Hat-based Linux systems.

## 2. Core Archive Commands

| Action         | tar Command                | rar / 7z Command      |
| -------------- | -------------------------- | --------------------- |
| List Files     | tar -tf archive.tar        | 7z l archive.7z       |
| Create Archive | tar -cvf test.tar file.txt | 7z a test.7z file.txt |
| Extract All    | tar -xvf test.tar          | 7z x archive.7z       |

## 3. Running Scripts with chmod

On Linux, a script file (like my Application_Archive.sh) is just text until you tell the system it is allowed to "run" like a program.

- chmod +x Application_Archive.sh: The +x stands for +eXecute. This changes the file's mode to make it an executable file. Also, In Linux, files are not executable by default. You use the chmod (Change Mode) command to grant permission to run them:
  Command: chmod +x Apllication_Archive.sh
- What it does: The +x flag tells the system this file is now an executable.
- Running it: After using chmod, you can run it with ./Application_Archive.sh.

## 4. Testing Procedures (.sh Script)

i used these script likely to automates these steps:

1.  Preparation: Creates a dummy file (test_file.txt).
2.  Compression Test: Runs tar or 7z to create an archive from that file.
3.  Verification: Uses the list command (-tf or l) to ensure the file is inside.
4.  Extraction: Deletes the original and extracts the file from the archive to ensure it survives.

## My Application_Archive.sh

#!/bin/bash

# 1. Create a dummy test file

echo "This is a test file for compression" > test_file.txt

echo "--- Testing TAR ---"
tar -cvf test.tar test_file.txt # c: create, v: verbose, f: file
tar -tf test.tar # t: list contents
tar -xvf test.tar # x: extract

echo -e "\n--- Testing ZIP ---"
zip test.zip test_file.txt # a: add/create
unzip -l test.zip # -l: list contents
unzip -o test.zip # -o: overwrite during extract

echo -e "\n--- Testing 7z ---"7z a test.7z test_file.txt # a: add to archive7z l test.7z # l: list contents7z x test.7z -aoa # x: extract with -aoa (overwrite)

echo -e "\n--- Cleanup ---"
rm test_file.txt test.tar test.zip test.7z
echo "Tests completed!"

## In Conclusion: No-Root Workaround

On my work Ubuntu laptop, i couldn't install rar or 7z because i don't have root (sudo) privileges.

- The Issue: Standard Linux commands like apt install require administrator access to modify system folders.
- The Solution: By using my personal laptop, i had full control to install the necessary libraries (p7zip-full, unrar).
