# 📓 Engineering Journal: Day 23

## 🎯 Goal

Shift from building standard terminal tools (`task-cli`) to writing robust, persistent background web programs utilizing modern **ES Modules (`import/export`)**. Clean up the legacy structural files to strictly pass the **Airbnb ESLint configuration** and maintain absolute formatting synchronization with **Prettier**.

---

## 🛠️ Achievements & Implementations

### 1. Architectural Code Layering (Separation of Concerns)

- **Storage Layer (`storage.mjs`)**: Manages isolated file system operations safely using the native promise-based `node:fs/promises` API.
- **Core Logic Engine (`taskManager.mjs`)**: Centralizes shared data manipulation utilities (creating, updating, filtering) for both the web interface and terminal pipelines.
- **Network Controller (`controller.js`)**: Decodes streaming buffer data packets over raw HTTP connections and manages status headers safely.
- **Main Entry Point (`server.js`)**: Functions as a fast traffic router targeting distinct functional routing paths on Port 3001.

### 2. Airbnb ESLint & Prettier Compliance

- Removed all toxic, unhandled global `console` functions and swapped them for strict `process.stdout.write` streams.
- Eliminated direct mutable modifications (like `.push()` or selective array index item rewrites) and refactored using functional, immutable patterns (`.map()`, `.filter()`, and the spread operator `[...]`).
- Erased destructive `process.exit(1)` sequences inside the core engine module and transitioned to throwing standardized errors (`throw new Error`), allowing top-level wrappers to catch and resolve failures elegantly.
- Replaced global `isNaN()` evaluations with strict `Number.isNaN()` formatting checks to stop implicit type-coercion bugs.

---

## 📈 Blockers Overcome & Key Discoveries

- **Duplicate Declaration Error**: Resolved a terminal compilation failure (`SyntaxError: Identifier 'printStats' has already been declared`) by cleaning up duplicate references and unifying the analytics module block.
- **URL Parsing Breaks**: Handled silent payload crashes on missing headers inside testing pipelines by adding a fallback host parameter to the native `URL` wrapper constructor: `req.headers.host || 'localhost:3001'`.
- **Git Isolation Workflow**: Refactored the entire project structure on an isolated working branch (`feature/eslint-airbnb-setup`) to keep the working repository protected while testing changes.

---
