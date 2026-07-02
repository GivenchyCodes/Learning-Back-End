# Task Tracker CLI

A lightweight Command Line Interface (CLI) application designed to track, manage, and monitor personal tasks directly from your terminal. Built as part of a backend learning milestone.

## Features

- **Add Tasks**: Automatically assigns unique sequential IDs and timestamps.
- **Update Tasks**: Modify descriptions of existing tasks easily.
- **Delete Tasks**: Remove old items permanently by their unique ID.
- **Status Management**: Track progress with state changes (`todo`, `in-progress`, `done`).
- **Filterable Lists**: View all entries or selectively filter lists by current status.

## Installation

Ensure you have Node.js installed on your system.

```bash
npm install
```

## Usage Syntax Guide

Invoke operations by supplying commands directly to the core application file:

```bash
# Add a task
node task-cli.js add "Buy groceries"

# List tasks
node task-cli.js list
node task-cli.js list todo
node task-cli.js list in-progress
node task-cli.js list done

# Update a task description
node task-cli.js update 1 "Buy groceries and prep meals"

# Change task status
node task-cli.js mark-in-progress 1
node task-cli.js mark-done 1

# Delete a task
node task-cli.js delete 1
```
