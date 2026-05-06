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
