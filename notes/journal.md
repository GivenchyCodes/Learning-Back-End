# Learning Journal - May 4, 2026

# Day 4

## 📚 Today's Learning: Git & GitHub Mastery

Today was all about version control—specifically branching, merging, and bridging the gap between local and remote environments.

### Learning Outcomes

- **Branch Management**: I successfully created, switched, and merged branches using `git checkout -b`, `git checkout`, and `git merge`.
- **Conflict Resolution**: I handled a manual merge conflict when changes on `main` diverged from the `feature` branch.
- **GitHub Integration**: i created the `learning-backend` repository and synchronized local work with the cloud.
- **SSH Setup**: I also established a secure, password-less connection between my machine and GitHub.

---

## 🛠️ Completed Tasks

### 1. Branching & Conflicts

- **Task**: I created `feature/add-notes`, modified code, and committed.
- **Task**: I switched to `main` and verified the change was absent.
- **Task**: I did intentionally caused a conflict by modifying the same line in `main`.
- **Resolution**: Ran `git merge feature/add-notes`, manually edited the file to pick the best changes, and finalized the merge with a commit.

### 2. GitHub Repository Setup

- **Repo Name**: `Learning-BackEnd2`
- **Commands Used**:
  ```bash
  git remote add origin <repo-url>
  git push -u origin main
  ```
- **Verification**: Confirmed all local history and files are visible on the GitHub UI.

### 3. Iterative Workflow Practice

Repeated the **Create → Change → Commit → Merge → Push** cycle 3+ times to build muscle memory. This confirmed that `git push` only sends what has been committed and that `main` stays protected until explicitly updated.

---

## 🚀 Stretch & Mastery Results

### SSH Authentication

Set up an SSH key using `ssh-keygen` and added it to my [GitHub Settings](https://docs.github.com/en/authentication/connecting-to-github-with-ssh). This removes the need for personal access tokens for every push.

### Pull Requests (PRs)

Instead of merging locally, I pushed a feature branch to GitHub and opened a **Pull Request**. This allows for code review and automated checks before merging into the production-ready `main` branch.
I have git pull from local machine now, i will also git push back to compare and merge.

### Git Rebase vs. Merge

- **Merge**: I creates a "merge commit" that ties two histories together. It’s non-destructive and keeps the context of when the merge happened.
- **Rebase**: I rewrites the project history by "replaying" my changes on top of the latest `main`. It creates a cleaner, linear history but should be used carefully on shared branches.

---

## 🔗 Resources Used

- [Git — Branching and Merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)
- [GitHub Quickstart Guide](https://docs.github.com/en/get-started/quickstart)
- [SSH Key Setup Instructions](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
