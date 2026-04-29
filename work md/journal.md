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
