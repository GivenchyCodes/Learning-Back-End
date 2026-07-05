# Engineering Journal: Day 22 (Part 2) — Native Unit Testing Architecture

**Project Name:** `task-cli` (Command-Line Task Manager)
**Completion Date:** July 5, 2026
**Testing Environment:** Node.js Native Test Runner (`node:test`)
**Status:** 100% Core Verification Achieved

---

## 1. Architectural Strategy & Blueprint

To protect our codebase from regressions, a robust testing layer was introduced. Instead of relying on external third-party software (like Jest or Mocha), this project leverages the native Node.js ecosystem (`node:test` and `node:assert/strict`).

### Storage Sandbox Semantics

To ensure tests do not overwrite or corrupt production data, `storage.mjs` was configured to intercept environment flags:

```javascript
const FILE_PATH = path.join(
  process.cwd(),
  process.env.NODE_ENV === 'test' ? 'tasks.test.json' : 'tasks.json',
);
```

- **Semantics:** When `NODE_ENV=test` is active, the data persistence engine points to a isolated sandbox file (`tasks.test.json`).

---

## 2. Deep Dive: Code Syntax & Semantics Validation

### Category 1: Structural Data Integrity & Exception Testing

This testing profile targets basic storage mutation success loops and defensive parameter constraints.

#### Lifecycle Automation Syntax

```javascript
beforeEach(async () => {
  try {
    await fs.unlink(TEST_FILE);
  } catch {}
});
afterEach(async () => {
  try {
    await fs.unlink(TEST_FILE);
  } catch {}
});
```

- **Semantics:** Deletes the test file sandbox before and after every test run. The empty `catch {}` block ensures that if the file does not exist yet, the test runner gracefully bypasses it without throwing a false-negative crash.

#### Data Integrity Assertion Syntax

```javascript
await addTask('Verify unit test engine integration');
const tasks = await loadTasks();

assert.equal(tasks.length, 1);
assert.equal(tasks.id, 1);
```

- **Semantics:** Compares memory outcomes against expected values. It verifies that array pushes work correctly and key auto-increment properties resolve cleanly.

#### Global Object Hijacking & Restoration Syntax

```javascript
const originalExit = process.exit;
let exitCodeCalled = null;
process.exit = (code) => {
  exitCodeCalled = code;
};

await addTask('   ');
assert.equal(exitCodeCalled, 1);

process.exit = originalExit;
```

- **Semantics:** Validates defensive logic boundaries. Passing empty spaces (`'   '`) triggers our code safety guard which attempts to run `process.exit(1)`. To prevent the test runner from killing itself mid-run, `process.exit` is hijacked into a local wrapper variable. Once verified, the global state is restored to its original method to prevent test runner pollution.

---

### Category 2: Console Stream Interception & Analytics Testing

This testing profile redirects standard terminal print workflows to check mathematical computing ratios.

#### Output Stream Spying Syntax

```javascript
const originalLog = console.log;
const capturedLogs = [];
console.log = (message) => {
  if (message) capturedLogs.push(message);
};
```

- **Semantics:** Diverts console print streams into a hidden list. This allows the system to read printed metrics strings programmatically.

#### Seed Mock Database Manipulation Syntax

```javascript
const mockTasks = [
  {
    id: 1,
    description: 'T1',
    status: 'done',
    dueDate: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    description: 'T2',
    status: 'todo',
    dueDate: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    description: 'T3',
    status: 'in-progress',
    dueDate: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    description: 'T4',
    status: 'done',
    dueDate: null,
    createdAt: new Date().toISOString(),
  },
];
await saveTasks(mockTasks);
await printStats();
```

- **Semantics:** Generates a fixed mathematical state (`2 out of 4 tasks done`). This executes our arithmetic logic block to check if the completion ratio evaluates to exactly `50.0%`.

#### Regex Pattern Verification Syntax

```javascript
console.log = originalLog;
const fullOutputText = capturedLogs.join('\n');

assert.match(fullOutputText, /Absolute Records Total\s*:\s*4/);
assert.match(fullOutputText, /50\.0% Complete/);
```

- **Semantics:** Scans text payloads for structural patterns using regular expressions instead of rigid string checking. This keeps the tests completely stable if terminal spacings or ANSI colors change in the future.

---

## 3. Automation Operating Procedures

Testing commands are executed directly in the terminal terminal workspace:

```bash
# Execute the suite metrics run one time
NODE_ENV=test node --test taskManager.test.mjs

# Execute hot-reloading watch mode
NODE_ENV=test node --test --watch taskManager.test.mjs
```

---

## 4. Key Takeaways

1. **Global State Cleanliness:** Overriding global behaviors (`console.log`, `process.exit`) requires exact cleanup to prevent code pollution.
2. **Zero Dependency Overhead:** Native tools are faster, require less maintenance, and completely side-step third-party security vulnerabilities.
3. **Resilient Assertions:** Using regular expressions ensures that core business logic testing remains decoupled from brittle terminal UI layout updates.
