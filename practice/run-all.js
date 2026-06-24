import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🚀 Starting Day 18 Workspace Generation and Execution...\n');

// --- Helper function to safely write files and folders ---
function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content.trim() + '\n');
}

// ==========================================
// TASK 1: CommonJS Setup
// ==========================================
writeFile(
  'day-18/cjs/utils.js',
  `
const double = (num) => num * 2;
const greet = (name) => \`Hello, \${name}!\`;
const PI = 3.14159;

module.exports = { double, greet, PI };
`,
);

writeFile(
  'day-18/cjs/index.js',
  `
const utils = require('./utils');
console.log('--- Task 1: CommonJS Output ---');
console.log(utils.greet('Developer'));
console.log(\`Double of 21 is: \${utils.double(21)}\`);
console.log(\`Value of PI: \${utils.PI}\\n\`);
`,
);

// ==========================================
// TASK 2: ES Modules Setup
// ==========================================
writeFile(
  'day-18/esm/package.json',
  JSON.stringify({ type: 'module' }, null, 2),
);

writeFile(
  'day-18/esm/utils.js',
  `
export const double = (num) => num * 2;
export const greet = (name) => \`Hello, \${name}!\`;
export const PI = 3.14159;
`,
);

writeFile(
  'day-18/esm/index.js',
  `
import { double, greet, PI } from './utils.js';
console.log('--- Task 2: ES Modules Output ---');
console.log(greet('Modern Coder'));
console.log(\`Double of 50 is: \${double(50)}\`);
console.log(\`Value of PI: \${PI}\\n\`);
`,
);

// ==========================================
// TASK 3: Mixed Exports Setup
// ==========================================
writeFile(
  'day-18/esm/mathEngine.js',
  `
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

const mathUtils = {
  version: '2.0.0',
  description: 'Advanced Math Engine'
};
export default mathUtils;
`,
);

writeFile(
  'day-18/esm/main.js',
  `
import mathUtils, { add, subtract } from './mathEngine.js';
console.log('--- Task 3: Default + Named Exports Output ---');
console.log(\`Engine: \${mathUtils.description} (v\${mathUtils.version})\`);
console.log(\`10 + 5 = \${add(10, 5)}\`);
console.log(\`10 - 5 = \${subtract(10, 5)}\\n\`);
`,
);

// ==========================================
// TASK 4: Interoperability Setup
// ==========================================
writeFile(
  'day-18/interop/package.json',
  JSON.stringify({ type: 'module' }, null, 2),
);

writeFile(
  'day-18/interop/cjsModule.cjs',
  `
module.exports = { msg: "Hello from the CommonJS world!" };
`,
);

writeFile(
  'day-18/interop/esmModule.js',
  `
export const esmMsg = "Hello from the ES Module universe!";
`,
);

writeFile(
  'day-18/interop/test-interop.js',
  `
import cjs from './cjsModule.cjs';
console.log('--- Task 4: Interoperability Output ---');
console.log('1. ESM importing CJS:', cjs.msg);

try {
  console.log('2. Attempting to require ESM from CJS...');
  // Standard require would throw an error here, demonstrating the workaround:
  import('./esmModule.js').then((esm) => {
    console.log('Async Import Success:', esm.esmMsg);
    console.log('\\n/* COMMENTARY RECORD: ESM importing CJS works seamlessly. CJS requiring ESM synchronously throws an error, requiring an async dynamic import() workaround. */\\n');
  });
} catch (err) {
  console.log('Caught expected sync require failure:', err.message);
}
`,
);

// ==========================================
// TASK 5: Modular App Split (Todo App Example)
// ==========================================
writeFile(
  'day-18/todo-app/package.json',
  JSON.stringify({ type: 'module' }, null, 2),
);

writeFile(
  'day-18/todo-app/todoModel.js',
  `
export class Todo {
  constructor(id, task) {
    this.id = id;
    this.task = task;
    this.completed = false;
  }
}
`,
);

writeFile(
  'day-18/todo-app/todoService.js',
  `
import { Todo } from './todoModel.js';
export class TodoService {
  constructor() { this.todos = []; }
  addTodo(task) {
    const todo = new Todo(this.todos.length + 1, task);
    this.todos.push(todo);
    return todo;
  }
  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) todo.completed = !todo.completed;
  }
  getTodos() { return this.todos; }
}
`,
);

writeFile(
  'day-18/todo-app/todoView.js',
  `
export function renderTodoList(todos) {
  console.log('--- Task 5: Modular Todo App Output ---');
  if (todos.length === 0) return console.log('No tasks!');
  todos.forEach(t => console.log(\`[\${t.completed ? '✅' : '❌'}] ID \${t.id}: \${t.task}\`));
  console.log('--------------------------------------\\n');
}
`,
);

writeFile(
  'day-18/todo-app/index.js',
  `
import { TodoService } from './todoService.js';
import { renderTodoList } from './todoView.js';

const app = new TodoService();
app.addTodo('Learn Modular JS Patterns');
app.toggleTodo(1);
renderTodoList(app.getTodos());
`,
);

// ==========================================
// SEQUENTIAL EXECUTION OF ALL CREATED TASKS
// ==========================================
try {
  console.log('📁 All files generated successfully.\n');

  // Run Task 1
  execSync('node day-18/cjs/index.js', { stdio: 'inherit' });

  // Run Task 2
  execSync('node day-18/esm/index.js', { stdio: 'inherit' });

  // Run Task 3
  execSync('node day-18/esm/main.js', { stdio: 'inherit' });

  // Run Task 5
  execSync('node day-18/todo-app/index.js', { stdio: 'inherit' });

  // Run Task 4 (Handled last due to async microtask execution logs)
  execSync('node day-18/interop/test-interop.js', { stdio: 'inherit' });
} catch (error) {
  console.error('An error occurred during execution:', error.message);
}
