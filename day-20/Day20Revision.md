# Revision Journal: Advanced JavaScript Collections

**Date:** June 30, 2026

## 1. Map vs. Plain Object ({})

- **The `[object Object]` Trap:** Plain objects force all object keys into strings. Every object stringifies to `"[object Object]"`, causing subsequent assignments to overwrite previous ones.
- **Map Reference Memory:** `new Map()` ignores `.toString()`. It checks actual memory addresses (`0x001` vs `0x002`), allowing unique objects to serve as independent keys.
- **Performance:** Maps execute lookups in constant time ($O(1)$) via hash hashing. Arrays execute linear lookups ($O(N)$), slowing down as datasets grow.

## 2. WeakMap & Memory Leaks

- **Garbage Collection:** Standard Maps hold strong references. A `WeakMap` uses weak references for keys.
- **Production Use Case:** Perfect for API request caching or tracking session states. When the object key is set to `null`, its cached dataset is scrubbed automatically from memory.

## 3. Set Operations

- **Deduplication:** Instantly drops duplicate array items via `[...new Set(array)]`.
- **Union:** Combines distinct pools cleanly: `[...new Set([...arr1, ...arr2])]`.
- **Intersection:** Finds common overlapping assets using `.filter(item => set.has(item))` in fast $O(1)$ time.

## 4. Syntax & String Behaviors

- **Template Literals (`` ` ``):** Modern string structure. Eliminates messy `+` string concatenation.
- **Interpolation (`${}`):** A text-replacement engine placeholder. It evaluates statements and generates string text. It is **not** a pointer to a raw memory address.
- **Custom `.toString()`:** You can hijack the default `[object Object]` print behavior by adding a custom `toString()` method inside an object or class layout.

### JavaScript Template Literals & Collections Hierarchy

1. Core Syntax (The Foundation)

- Variable Interpolation: `Hello ${name}`
- Expression Evaluation: `${x + y}`
- Multi-line Strings: `line 1\nline 2`
- Literal Nesting: `${`nested \${value}`}`

2. Standard Collection Operations

- Array Mapping: `${array.map(item => item)}`
- Array Joining: `${array.join(', ')}`
- Object Property Access: `${user.profile.name}`
- Ternary Conditionals: `${isAdmin ? 'Yes' : 'No'}`

3. Advanced Collection Operations

- Map Iteration: `Key: ${key}, Value: ${val}`
- Set Conversion: `${[...mySet].join()}`
- HTML Component Generation: `<div>${items.map(i => `<li>\${i}</li>`).join('')}</div>`

4. Meta-Programming (The Apex)

- Tagged Templates: myTagFunction``` text ${value}` ``
- Raw String Access: String.raw``` C:\Development\node` ``
- Sanitization Engines: html``` ${userInput}` ``

## Mastery

This mastery and strechery i reviewed today is advanced `JavaScript collections`, `contrasting Map` and `WeakMap` with objects for memory-based keys and `automated garbage collection`, while detailing Set operations for unique data handling.

**_Key topics_** include using `Map` for performance over string-forced objects, `WeakMap` for preventing memory leaks, and leveraging Set for deduplication and intersection, along with template literal syntax.
