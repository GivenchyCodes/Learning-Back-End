# Engineering Journal: Day 22 — Mini Project Completion

**Project Name:** `task-cli` (Command-Line Task Manager)
**Completion Date:** July 5, 2026
**Status:** Core, Stretch & Mastery Fully Achieved (100% Complete)

---

## 1. Plan & Architectural Blueprint

Before touching the codebase, the project was mapped into strict functional layers to prevent dependency tangles and guarantee clean code separation.

### File Responsibility Mapping

- **`package.json`**: App metadata declaring native Node.js ES Modules (`"type": "module"`) and the global binary execution link registry (`"bin"`).
- **`storage.mjs`**: Data-access persistence abstraction layer using asynchronous Promises (`fs/promises`). Ensures safe data lifecycle checks on startup.
- **`taskManager.mjs`**: Core business logic engine managing state filters, auto-increment identifier arrays, formatting outputs, color templates, and analytical payload metrics.
- **`task-cli.js`**: CLI runtime application driver that slices parameters from standard process arrays (`process.argv`), normalizes user strings, and handles structural command dispatching.

### Schema Design (`tasks.json`)

Each item in the collection array mirrors this data pattern structure:

```json
{
  "id": 1,
  "description": "Task description string string text",
  "status": "todo" | "in-progress" | "done",
  "createdAt": "ISO-8601-Timestamp-String",
  "updatedAt": "ISO-8601-Timestamp-String",
  "dueDate": "YYYY-MM-DD" | null
}
```

---

## 2. Predict vs. Reality Check

### Original Expectations

- **Expected Easy**: Basic procedural switch-statement evaluations inside the terminal entry driver file, and appending item payloads into live memory structures.
- **Expected Hard**: Handling raw filesystem concurrency crashes asynchronously, rendering cleanly padded columns on systems with varying console widths, and isolating array subsets without losing database indexes.

### Self-Confidence Scoring Matrix

| Capability                        | Initial Confidence | Post-Build Reflection | Lessons Learned / Reality                                                                                            |
| :-------------------------------- | :----------------: | :-------------------: | :------------------------------------------------------------------------------------------------------------------- |
| **Reading & Writing Data Files**  |        4/5         |          5/5          | Using `fs.access` wrapped inside a `try-catch` securely shields our engine against initial system state crashes.     |
| **Splitting Code into Modules**   |        3/5         |          5/5          | ES Modules (`import/export`) keep operations decoupled, highly readable, and easily extensible.                      |
| **Handling Unhappy Paths Safely** |        4/5         |          5/5          | Defensive input scanning using `.trim()`, `isNaN()`, and targeted `process.exit(1)` stops runtime crashes instantly. |
| **Command Execution Accuracy**    |        5/5         |          5/5          | Programmatic string normalization (`.toLowerCase()`) mitigates execution failure from varying case inputs.           |

---

## 3. Implemented Features & User Stories Tracker

### Core Requirements (Completed)

- ✅ **Story 1 (Add Task)**: Generates complete tracking records via `task-cli add`. Automatically indexes items by scanning maximum numeric properties cleanly.
- ✅ **Story 2 (List Tasks)**: Prints all active records or applies explicit query isolation loops (`todo`, `in-progress`, `done`).
- ✅ **Story 3 (Update Task)**: Targets elements by numeric keys, updates descriptive content, and refreshes the audited modification timeline.
- ✅ **Story 4 (Delete Task)**: Drops array subsets safely, triggering system messages or throwing descriptive execution errors if targets are missing.
- ✅ **Story 5 (Status Transitions)**: Switches records between processing milestones smoothly using targeted `mark-in-progress` and `mark-done` entry points.

### Stretch & Mastery Scope (Completed via Feature Branch)

_All mastery milestones were safely engineered in isolation on the `feature/day22-mastery` branch._

- ✅ **ANSI Color Engine**: Injected zero-dependency terminal colors into tables using native escape logs (Red for `todo`, Yellow for `in-progress`, Green for `done`).
- ✅ **Keyword Search Index**: Built substring verification loops (`.includes()`) that isolate and print list data frames targeting specific words.
- ✅ **Due Dates & Overdue Watchdog**: Injected standard calendar constraint triggers (`YYYY-MM-DD`). The engine dynamically flags past-due items in bold red if they aren't complete.
- ✅ **Analytical Stats Dashboard**: Created a performance monitoring utility (`task-cli stats`) that logs absolute tracking totals, status subsets, and exact execution progress ratios.

---

## 4. Unhappy Path Safeguards

The application handles anomalous inputs defensively to ensure clear user guidance over technical failure:

1.  **Missing Database Checks**: If `tasks.json` is missing on initialization, the file engine automatically catches the error and writes an empty JSON array string (`[]`).
2.  **Invalid Numeric Operations**: Typing non-numerical targets for operational mutations throws a localized error text block before safely exiting the process.
3.  **Missing String Payloads**: Passing blank space sequences inside arguments is blocked by descriptive field tracking validations.
4.  **Unknown Routing Terms**: Unrecognized command string arguments print a full contextual syntax helper text manual before safely terminating the script run.

---

## 5. Branching & Git Management Workflow

To preserve codebase stability, a strict branch isolation workflow was maintained:

- **Development Branch**: `feature/day22-mastery`
- **Isolation Scope**: Encapsulated the addition of metrics calculation, text processing queries, and terminal formatting algorithms away from the deployment code line.
- **Commit Methodology**: Atomic multi-line messages breaking down specific software additions across modules.

---

## 6. Summary & Key Takeaways

This project bridges basic data array manipulation with permanent filesystem storage, presenting a small-scale model of how backend systems process inputs. Splitting the app into distinct layers—**CLI Input Handler, Core Manager, and Storage Engine**—shows how scalable web services organize operations cleanly.

The application is completely stable, fully validated, and successfully committed under full version control.
