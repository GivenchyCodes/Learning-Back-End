import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  // 👇 Add this block to ignore config and build files
  {
    ignores: [
      'eslint.config.js',
      '**/vite.config.js',
      '**/next.config.js',
      'node_modules/',
    ],
  },

  ...compat.extends('eslint-config-airbnb-base'),
  prettier,

  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser, // 👈 Keeps 'document' error from firing in frontend scripts
      },
    },
    rules: {
      // 👇 Turn off rules that are annoying for learning/logging backends
      'no-console': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-unresolved': 'off',
      'spaced-comment': 'off',
      'no-unused-vars': 'off',
      'func-names': 'off',
    },
  },
];
