## JavaScript Core Fundamentals Training

Welcome to the comprehensive JavaScript Core Fundamentals tracking repository. This repository serves as a structured daily log documenting essential JavaScript language mechanics, execution behaviors, syntax patterns, and data structures through programmatic implementations and technical references.

## 📅 Curriculum & Progress Directory

| Day     | Topic                  | Key Focus Areas                                                        | Code Status |
| ------- | ---------------------- | ---------------------------------------------------------------------- | ----------- |
| 01 - 10 | Foundations            | Variables, Scope, Control Flow, Functions, Closures, Array Methods     | Completed   |
| 11      | Objects & Immutability | Object Literals, Destructuring, Merging, Property Descriptors, Cloning | Active      |
| 12+     | Advanced Engine        | Prototypes, Promises, Async/Await, Event Loop, Classes                 | Upcoming    |

## Day 11 — Objects & Immutability## 📋 Overview

Day 11 isolates the core behaviors of JavaScript's fundamental data container: the Object. Implementation tasks focus on property lifecycle manipulation (CRUD), engine execution flags, explicit memory separation, and standard object traversal patterns.

## 🛠️ Deep Technical Deep Dives## 1. Prototype Traversal (in) vs Local Instance Flags (hasOwnProperty)

- key in object: Instructs the JavaScript engine to sweep the immediate object's properties. If unpaid, it moves up the target's prototype chain (**proto**) recursively until hitting Object.prototype. Returns true if found anywhere on the lineage.
- hasOwnProperty(): Ignores inherited properties completely. It returns true only if the property exists directly as a direct key allocation on that concrete object slice.

Security Note: Always invoke via Object.prototype.hasOwnProperty.call(obj, key) to prevent runtime crashes caused by objects initialized with null prototypes (Object.create(null)).

## 2. Immutability Matrix: Object.seal() vs Object.freeze()

| Capability Restriction     | Object.seal() | Object.freeze() |
| -------------------------- | ------------- | --------------- |
| Prevent Adding Keys        | ❌ Yes        | ❌ Yes          |
| Prevent Removing Keys      | ❌ Yes        | ❌ Yes          |
| Mutate Existing Key Values | 🔄 Allowed    | ❌ Read-Only    |
| Structural Depth           | Shallow Only  | Shallow Only    |

Both mechanisms execute a shallow restriction. If a sealed or frozen object contains nested arrays or objects, those secondary internal references remain fully dynamic and mutable. True immutability requires structural recursion across the tree (a "deep freeze" pattern).

## 3. Engine Property Descriptors

Every key-value pair is governed by invisible structural switches exposed via Object.getOwnPropertyDescriptor():

- writable: When false, structural assignments (e.g., obj.key = 'new') fail silently or throw a TypeError in strict mode.
- enumerable: When false, the property becomes invisible to internal iterative behaviors like for...in loops, Object.keys(), or spread expansion operations.
- configurable: When false, any manual attempt to drop the key via delete or alter its behavioral flags (writable, enumerable) will fail.

## 4. Memory Allocations: Shallow vs Deep Cloning

- Spread Syntax Replication ({...obj}): Allocates a new root object, but scales only one level deep. Nested object and array memory references are copied by address location rather than value. Modifying a sub-array on the clone will simultaneously alter the original source object.
- structuredClone() Native Mechanism: Executes an optimization routing algorithm to construct an entirely new independent memory hierarchy down to the leaves of the data architecture. Cycles are resolved properly, meaning instances of Date, Map, Set, and RegExp copy accurately without passing shared memory addresses back to the origin container.
