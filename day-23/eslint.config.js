import { FlatCompat } from "@eslint/compat";
import path from "node:path";
import { fileURLToPath } from "node:url";
import configPrettier from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Seamlessly translates the legacy airbnb rules into modern ESLint format
  ...compat.extends("eslint-config-airbnb-base"),
  configPrettier,
];
