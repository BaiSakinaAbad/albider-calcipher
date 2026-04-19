
# CONTRIBUTING.md

## Welcome to Albider! 
Thank you for contributing to Albider. To ensure the safety and reliability of our student pickup management system, we follow a strict branching and review process.

---

## Branching Policy
The `main` branch is **protected**. Direct pushes to `main` are disabled. All contributors must work on their own branches and submit a Pull Request.

### Branch Naming Convention
Please name your branches using the following prefixes to keep the repository organized:

| Prefix | Purpose | Example |
| :--- | :--- | :--- |
| `feat/` | A new feature or functionality | `feat/qr-scanner-logic` |
| `fix/` | A bug fix | `fix/auth-callback-loop` |
| `docs/` | Documentation changes only | `docs/update-readme` |
| `refactor/` | Code changes that neither fix a bug nor add a feature | `refactor/supabase-client` |
| `chore/` | Updating build tasks, dependencies, etc. | `chore/update-deps` |

---

## How to Contribute

1.  **Clone the Repository:** Ensure your local copy is up to date.
2.  **Create a Branch:** Use the naming convention above.
    ```bash
    git checkout -b feat/your-feature-name
    ```
3.  **Commit Your Changes:** Provide clear, descriptive commit messages.
4.  **Push to Your Branch:**
    ```bash
    git push origin feat/your-feature-name
    ```
5.  **Open a Pull Request (PR).**

---

## Pull Request Rules
To maintain code quality, all Pull Requests must adhere to these rules:

* **Description:** Every PR must include a clear summary of the changes and the "why" behind them.
* **Issue Linking:** If your PR addresses a specific issue, link it in the description (e.g., `Closes #12`).
* **Single Responsibility:** Keep PRs focused. If you are fixing a bug and adding a feature, please submit them as two separate PRs.
* **No Sensitive Data:** **Double-check** that no `.env` files or Supabase service keys are included in your commits.
* **Review Required:** At least one maintainer must review and approve the PR before it is merged into `main`.

---

## Code Standards
* Follow the existing linting and formatting rules.
* Ensure all new features are tested and do not break the existing QR verification flow.
* Keep security at the forefront—never trust client-side data without server-side validation via Supabase RLS (Row Level Security).

---

### Tips for your Repo:
* **Branch Protection:** In GitHub, go to **Settings > Branches > Add branch protection rule**. Set the pattern to `main` and check **"Require a pull request before merging"**.
