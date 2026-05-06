## Day 3 — Git Fundamentals (Part 1)

Journal: Day 3 — Git Fundamentals
Date: April 28, 2026
Topic: Version Control & Git Basics

## What I Learned Today

Today was all about Git, the system developers use to track code changes. I learned that Git acts like a "save point" for projects. Instead of saving a file as project_final_v2.js, I can use Git to keep a clean history of every change I’ve ever made.

## Key concepts I got while studying:

The Three Stages:

- The Working Directory (where I type),
- the Staging Area (where I prep changes), and
- the Repository (where changes are permanently stored).

- Commits: These are snapshots of the project. I learned to use Conventional Commits (like feat: or chore:) to make my history readable for others.
- .gitignore: How to tell Git to ignore "junk" files or private credentials so they don't get uploaded.

# Progress Check

- Configured global Git settings.
- this creates a hidden .git folder that acts as a "save point" history for your code.
- Created a .gitignore file.
  using 'echo' to write the inside
- Practiced the add → commit cycle multiple times.
- Used git logs to view my project's timeline.
  Filtering Your Timeline
  If your project has many commits, use these filters to narrow down the timeline:
  By Author: git log --author="Givens".
  By Date: git log --since="2 weeks ago" or git log --after="2023-01-01".
  By File: git log -- [filename] shows only commits that affected a specific file.
  Limit Count: git log -n 5 shows only the 5 most recent commits

# Reflections

The workflow felt a bit repetitive at first, but I can see how git diff is a lifesaver for catching mistakes before they are saved. I also tried git stash, which is perfect for when I'm in the middle of something but need to switch tasks quickly without losing progress.

**Stretch & Mastery:**

1. Conventional Commits
   This is a standard way of writing commit messages so that both humans and automated tools can understand what happened just by glancing at the history.

- feat: A new feature for the user.
- fix: A bug fix.
- docs: Changes to documentation only (like a README).
- style: Formatting changes (white-space, missing semi-colons) that don't affect the code's meaning.
- refactor: Code changes that neither fix a bug nor add a feature (improving code structure).
- perf: A code change that improves performance.
- test: Adding missing tests or correcting existing ones.
- chore: Maintenance tasks (updating dependencies, build scripts).

2. Git Stash
   Think of this as a "Save for Later" drawer. Sometimes you’re halfway through a change but need to switch branches or pull new code without committing your messy, unfinished work.
   git stash: Takes your uncommitted changes and hides them away, making your directory "clean" (matching the last commit).
   git stash pop: Grabs those changes out of the drawer and puts them back into your files so you can keep working.

3. .gitignore Patterns
   This file tells Git, "Ignore these files; never track them or upload them."
   \*.log: The asterisk is a wildcard. This ignores any file ending in .log (e.g., error.log, server.log).
   dist/: Ignores an entire folder named dist and everything inside it. This is usually where "built" or "compiled" code goes.
   file vs. /file:
   file: Ignores any file named "file" anywhere in your project (even deep in subfolders).
   /file: Only ignores the file named "file" in the root (top-level) directory of your project.
