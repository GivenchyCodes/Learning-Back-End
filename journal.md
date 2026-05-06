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

## DAY 3 personal studies, I STUDIED MORE ABOUT ".SH" & "CHMOD" (Archive & Permissions Guide)

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

## Day 3 — Git Fundamentals (Part 1)

Journal: Day 3 — Git Fundamentals
Date: April 28, 2026
Topic: Version Control & Git Basics

## What I Learned Today

Today was all about Git, the system developers use to track code changes. I learned that Git acts like a "save point" for projects. Instead of saving a file as project_final_v2.js, I can use Git to keep a clean history of every change I’ve ever made.

## Key concepts I got while studying:

The Three Stages:

- The Working Directory (where I type),
- the Staging Area (where I prep changes), and
- the Repository (where changes are permanently stored).

- Commits: These are snapshots of the project. I learned to use Conventional Commits (like feat: or chore:) to make my history readable for others.
- .gitignore: How to tell Git to ignore "junk" files or private credentials so they don't get uploaded.

# Progress Check

- Configured global Git settings.
- this creates a hidden .git folder that acts as a "save point" history for your code.
- Created a .gitignore file.
  using 'echo' to write the inside
- Practiced the add → commit cycle multiple times.
- Used git logs to view my project's timeline.
  Filtering Your Timeline
  If your project has many commits, use these filters to narrow down the timeline:
  By Author: git log --author="Givens".
  By Date: git log --since="2 weeks ago" or git log --after="2023-01-01".
  By File: git log -- [filename] shows only commits that affected a specific file.
  Limit Count: git log -n 5 shows only the 5 most recent commits

# Reflections

The workflow felt a bit repetitive at first, but I can see how git diff is a lifesaver for catching mistakes before they are saved. I also tried git stash, which is perfect for when I'm in the middle of something but need to switch tasks quickly without losing progress.

## i'm making a stash test

**Stretch & Mastery:**

1. Conventional Commits
   This is a standard way of writing commit messages so that both humans and automated tools can understand what happened just by glancing at the history.

- feat: A new feature for the user.
- fix: A bug fix.
- docs: Changes to documentation only (like a README).
- style: Formatting changes (white-space, missing semi-colons) that don't affect the code's meaning.
- refactor: Code changes that neither fix a bug nor add a feature (improving code structure).
- perf: A code change that improves performance.
- test: Adding missing tests or correcting existing ones.
- chore: Maintenance tasks (updating dependencies, build scripts).

2. Git Stash
   Think of this as a "Save for Later" drawer. Sometimes you’re halfway through a change but need to switch branches or pull new code without committing your messy, unfinished work.
   git stash: Takes your uncommitted changes and hides them away, making your directory "clean" (matching the last commit).
   git stash pop: Grabs those changes out of the drawer and puts them back into your files so you can keep working.

3. .gitignore Patterns
   This file tells Git, "Ignore these files; never track them or upload them."
   \*.log: The asterisk is a wildcard. This ignores any file ending in .log (e.g., error.log, server.log).
   dist/: Ignores an entire folder named dist and everything inside it. This is usually where "built" or "compiled" code goes.
   file vs. /file:
   file: Ignores any file named "file" anywhere in your project (even deep in subfolders).
   /file: Only ignores the file named "file" in the root (top-level) directory of your project

# Learning Journal - May 4, 2026

# Day 4

## 📚 Today's Learning: Git & GitHub Mastery

Today was all about version control—specifically branching, merging, and bridging the gap between local and remote environments.

### Learning Outcomes

- **Branch Management**: I successfully created, switched, and merged branches using `git checkout -b`, `git checkout`, and `git merge`.
- **Conflict Resolution**: I handled a manual merge conflict when changes on `main` diverged from the `feature` branch.
- **GitHub Integration**: i created the `learning-backend` repository and synchronized local work with the cloud.
- **SSH Setup**: I also established a secure, password-less connection between my machine and GitHub.

---

## 🛠️ Completed Tasks

### 1. Branching & Conflicts

- **Task**: I created `feature/add-notes`, modified code, and committed.
- **Task**: I switched to `main` and verified the change was absent.
- **Task**: I did intentionally caused a conflict by modifying the same line in `main`.
- **Resolution**: Ran `git merge feature/add-notes`, manually edited the file to pick the best changes, and finalized the merge with a commit.

### 2. GitHub Repository Setup

- **Repo Name**: `Learning-BackEnd2`
- **Commands Used**:
  ```bash
  git remote add origin <repo-url>
  git push -u origin main
  ```
- **Verification**: Confirmed all local history and files are visible on the GitHub UI.

### 3. Iterative Workflow Practice

Repeated the **Create → Change → Commit → Merge → Push** cycle 3+ times to build muscle memory. This confirmed that `git push` only sends what has been committed and that `main` stays protected until explicitly updated.

---

## 🚀 Stretch & Mastery Results

### SSH Authentication

Set up an SSH key using `ssh-keygen` and added it to my [GitHub Settings](https://docs.github.com/en/authentication/connecting-to-github-with-ssh). This removes the need for personal access tokens for every push.

### Pull Requests (PRs)

Instead of merging locally, I pushed a feature branch to GitHub and opened a **Pull Request**. This allows for code review and automated checks before merging into the production-ready `main` branch.
I have git pull from local machine now, i will also git push back to compare and merge.

### Git Rebase vs. Merge

- **Merge**: I creates a "merge commit" that ties two histories together. It’s non-destructive and keeps the context of when the merge happened.
- **Rebase**: I rewrites the project history by "replaying" my changes on top of the latest `main`. It creates a cleaner, linear history but should be used carefully on shared branches.

---

## 🔗 Resources Used

- [Git — Branching and Merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
- [GitHub Quickstart Guide](https://docs.github.com/en/get-started/quickstart)
- [SSH Key Setup Instructions](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

# 📓 Learning Journal: Day 5 — Developer Workflow & Code Quality Conventions

## 📝 Today's Summary

Today, I transitioned from just writing code that works to establishing a professional, automated development workflow. I configured a comprehensive toolchain (`ESLint`, `Prettier`, `Vitest`, `Husky`, and `Lint-Staged`) to automatically enforce code quality, consistent styling, and automated testing before any code can be committed to Git.

---

## 🧠 Theory vs. Practical: What I Did in VSCode

### 📘 The Theory (Why This Matters)

- **Code Quality vs. Formatting:** Code quality (handled by **ESLint**) looks for structural issues, logical errors, and bugs (like accidental global variables or unreachable code). Formatting (handled by **Prettier**) deals purely with cosmetics, ensuring that font line widths, spacing, quotes, and semicolons are exactly the same across the entire project regardless of who writes it.
- **Automated Quality Gates:** Instead of relying on human memory to manually run formatting tools, we build a "quality gate" using **Git Hooks (Husky & Lint-Staged)**. If code doesn't meet our standards, the environment explicitly blocks the commit, protecting the shared codebase from broken code.

### 💻 The Practical (How it Behaved in VSCode)

1. **The Toolchain Install:** I initialized the system using `pnpm init` and added dev dependencies.
2. **Intentional Breaking:** I wrote a JavaScript file containing dirty code: using deprecated `var` keywords, creating variables that were never used, and forgetting semicolons.
3. **Running the Linter:** Inside my VSCode terminal, I executed my lint scripts. ESLint scanned the files, identified the structural breaking points, and highlighted the specific lines causing violations against the Airbnb standards.
4. **Auto-Formatting & Testing:** Prettier seamlessly corrected the spacing and quotes on save, while Vitest successfully verified that the environment sanity check was true.
5. **The Guardrail Check:** When I ran `git commit`, Husky automatically spun up, ran `vitest`, ran `lint-staged` on only my changed files, passed cleanly, and committed the changes.

---

## 🛠️ Toolchain Summary

- **pnpm:** A high-performance, disk-space-efficient package manager used to initialize the project and manage dependencies.
- **ESLint:** A static code analysis tool that parses code to catch programmatic errors, bad practices (like `var`), and syntax bugs.
- **Airbnb Style Guide:** An industry-standard, strict set of rules for JavaScript best practices that I plugged into ESLint.
- **Prettier:** An opinionated code formatter that automatically handles cosmetics (tabs, trailing commas, quotes) so developers don't argue over styling.
- **eslint-config-prettier:** A crucial utility that turns off all ESLint rules that might conflict with Prettier.
- **Vitest:** A modern, blazing-fast testing framework used to execute test suites natively with ES Modules (`"type": "module"`).
- **Husky & Simple-Git-Hooks:** Git hook managers that block commits if the project's quality standards are not met.
- **Lint-Staged:** An optimization tool that intercepts Git commits to run linting and formatting _only_ on the files currently being staged, saving time.

---

## 🚀 Execution & Task Answers

### Tasks 1 & 2: Project & Dependency Setup

Initialized the project and installed the complete development toolchain:

```bash
pnpm init
pnpm add -D vitest husky lint-staged eslint prettier @eslint/compat @eslint/eslintrc @eslint/js eslint-config-airbnb-base eslint-config-prettier eslint-plugin-import globals simple-git-hooks
pnpm exec husky init
```

### Tasks 3 & 4: Tooling Configurations

Created the rulebooks for the code quality tools in the project root:

- **`eslint.config.js`** (Configured for Node.js, modern ES2024 Modules, and extended with Prettier compatibility):

  ```javascript
  import js from '@eslint/js';
  import globals from 'globals';
  import prettier from 'eslint-config-prettier';

  export default [
    js.configs.recommended,
    prettier,
    {
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: { ...globals.node, ...globals.jest },
      },
      rules: {
        'no-unused-vars': 'warn',
        'no-console': 'off',
      },
    },
  ];
  ```

- **`.prettierrc`** (Explicit style boundaries):
  ```json
  {
    "semi": true,
    "singleQuote": true,
    "trailingComma": "es5",
    "printWidth": 80,
    "tabWidth": 2
  }
  ```

### Tasks 5 & 7: Breaking & Fixing Code (Linter Validation)

Tested the linter by creating a file with intentional issues (such as using `var`, leaving unused variables, and omitting semicolons). Running `pnpm lint` flagged these structural errors perfectly. Running `pnpm format` cleanly reformatted the styling issues.

### Task 6: Script Integration

Updated `package.json` with scripts to automate everything, including passing Vitest testing parameters gracefully during hooks:

```json
"scripts": {
  "lint": "eslint .",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "test": "vitest run",
  "setup-hooks": "simple-git-hooks",
  "prepare": "husky"
}
```

### Tasks 8 & 9: Git Hook Automation (Stretch & Mastery)

Set up automated gates. Created `index.test.js` to ensure the testing engine passes cleanly, and wired up `.husky/pre-commit` to catch bad code before it hits the repository:

```bash
#!/usr/bin/env sh
. "\$(dirname -- "\$0")/_/husky.sh"

pnpm test
pnpm exec lint-staged
```

Successfully triggered `git commit -m "chores: husky: Keep calm and commit"`. The project automatically ran tests, checked files via `lint-staged`, and finalized a clean commit!

---

## 🎯 5 Surprising Rules from the Airbnb Style Guide

1.  **Prefer `const` over `let` Everywhere:** Use `const` for all references; avoid `let` unless variables absolutely must be reassigned. `var` is strictly banned.
2.  **No Direct Object Prototype Calls:** You shouldn't call methods like `hasOwn` directly from an instance object (e.g., `obj.hasOwnProperty(key)`). You must call it safely through the base prototype (`Object.hasOwn(obj, key)`) to avoid properties masked by custom object values.
3.  **Strict Array/Object Destructuring:** When acquiring or assigning multiple properties or items from arrays/objects, you should always use destructuring expressions instead of manually accessing them via index/dot notation to make intent cleaner.
4.  **Avoid Iterators and `for...of` loops:** Airbnb discourages using `for...in` and `for...of` loops in favor of array prototype functions like `.map()`, `.reduce()`, and `.forEach()` because loops introduce side-effects and lack pure functional clarity.
5.  **Never Name a Function Parameter `arguments`:** Overwriting or creating a property variable named `arguments` will replace the native parameter object that is implicitly available to function execution contexts, introducing dangerous bugs.

## IN CONCLUSION

I did the testing and it work, also Mr. Melroy asked me question and instructed i fix an error code within 30 second and i did it.

I just need to keep practicing to be familiar with the standard.
