# Day 19 Learning Journal — JSON & Regular Expressions

## Self-Check Checklist

- [x] Convert an object to JSON text (serialization) and back (parsing).
- [x] Parse untrusted JSON without letting a bad string crash your program using `try/catch`.
- [x] Name three values that do not survive `JSON.stringify` (`undefined`, `functions`, `Date`).
- [x] Write a pattern for one or more digits (`/\d+/`) and digits exclusively from start to end (`/^\d+$/`).
- [x] Choose between `test` (boolean checking), `match` (extracting strings), `replace` (modifying text), and `split` (chopping text).

---

## Quick Questions & Answers

### 1. Why must JSON keys and strings use double quotes?

JSON was designed to be a universal, language-agnostic data interchange format. It enforces double quotes strictly so that parser engines across all programming languages (Java, Python, C++, etc.) can reliably parse data without dealing with language-specific quirks regarding single quotes.

### 2. You store a `Date` in an object, serialize it, then parse it back. What type is the date now?

The date is now a plain **String**. JSON does not have a native Date data type; it converts `Date` instances into standardized ISO string timestamps.

### 3. What does the `g` flag change about how `match` and `replace` behave?

- Without `g`: `match` returns details for only the _first_ match found. `replace` replaces only the _first_ match found.
- With `g` (global): `match` returns an array of _all_ matches found throughout the string. `replace` replaces _all_ occurrences found throughout the string.

### 4. Why is a simple regex a poor way to fully prove an email address is valid?

A simple regex only validates the basic syntax arrangement (e.g., characters before and after an `@` and a `.`). It cannot check if the domain actually exists, if the mailbox is full, if the spelling is a typo, or if the email addresses conform to specialized components allowed in official internet specifications (RFC 5322).

---

## Technical Concept Notes

### JSON Lifetime Trajectory

- **Object** ➔ `JSON.stringify()` ➔ **Serialized JSON Text String**
- **Serialized JSON Text String** ➔ `JSON.parse()` ➔ **Object**

### Mastery Learnings

- **Revivers:** A function mapping logic over keys and values during `JSON.parse()`, helpful for reviving ISO strings back to explicit `Date` objects.
- **Lookahead Assertions (`(?=...)`):** Matches a pattern conditionally depending on what follows it next, without tracking or pulling that trailer piece into the actual returned capture string value.
- **Named Capture Groups (`(?<name>...)`):** Enhances expression legibility by labeling structural captures to read output using semantic keys (`match.groups.name`) instead of fragile array numerical indexes.

### Key terms

- **JSON:** a strict text format for data; short for JavaScript Object Notation.
- **Serialize:** to turn a value into text, as `JSON.stringify` does.
- **Parse:** to turn text back into a value, as `JSON.parse` does.
- **`JSON.stringify`:** converts a JavaScript value into a JSON string.
- **`JSON.parse`:** converts a JSON string into a JavaScript value.
- **Replacer:** the `JSON.stringify` argument that controls which values are included.
- **Reviver:** the `JSON.parse` argument that can transform each value as it is parsed.
- **Regular expression (regex):** a pattern that describes a shape of text.
- **Flag:** a letter after a regex that changes its behaviour, such as `g` for every match and `i` for case-insensitive.
- **`test`:** a regex method that returns `true` or `false` for whether the text contains a match.
- **`match`:** a string method that returns the matches found by a pattern.
- **`replace`:** a string method that replaces matches with new text.
- **`split`:** a string method that breaks text into an array at each match.
