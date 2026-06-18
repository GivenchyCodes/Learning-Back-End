import { URL } from 'node:url'; // 2. Using node: prefix for built-in URL module

// ==========================================
// 1. DYNAMIC IMPORT() DEMO
// ==========================================
console.log('--- 1. Dynamic import() Demo ---');

const shouldLoadModule = true;

if (shouldLoadModule) {
  // We use a Data URI to simulate loading an external module dynamically without needing extra files
  const inlineModule =
    'data:text/javascript,export function greet() { return "Hello from a dynamically loaded module!"; }';

  import(inlineModule)
    .then((module) => {
      console.log(`✨ Success: ${module.greet()}`);
      console.log(
        '💡 Use Case: Only loads code on demand to save memory and boost initial startup speed!\n',
      );
    })
    .catch((err) => console.error('❌ Failed to load module:', err));
}

// ==========================================
// 2. NODE: PREFIX DEMO
// ==========================================
console.log('--- 2. node: Prefix Demo ---');
const currentFilePath = import.meta.url;
console.log(`✅ Safely used 'node:url' to parse this file's location.`);
console.log(`📄 Current File URL: ${currentFilePath}`);
console.log(
  '💡 Why use it? It guarantees Node loads core features even if someone names an npm package "url".\n',
);

// ==========================================
// 3. MODULE RESOLUTION EXPLANATION
// ==========================================
console.log('--- 3. Module Resolution Order ---');
console.log(
  'When you type: import express from "express", Node.js looks here:',
);
console.log('  1️⃣  Core Modules (Built-in Node systems)');
console.log('  2️⃣  Local node_modules/ folder');
console.log('  3️⃣  Parent node_modules/ folders (climbing up directory trees)');
console.log('  4️⃣  Global system folders');
