# Contributing to Voltraxx SDK

First off, thank you for considering contributing to the Voltraxx SDK! It's people like you that make this SDK a great tool for the open-source community.

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please report unacceptable behavior to the project maintainers.

## Local Development Setup

To set up the Voltraxx SDK locally for development, follow these steps:

1. **Fork the repository** to your own GitHub account and then clone it to your local device.
2. **Install dependencies**: This project uses `npm`. Run the following command in the root directory:
   ```bash
   npm install
   ```
3. **Build the SDK**: Ensure that the project builds successfully by running:
   ```bash
   npm run build
   ```

## Running Tests

The SDK uses [Vitest](https://vitest.dev/) for testing. 

- To run the test suite once, use:
  ```bash
  npm run test:run
  ```
- To run the tests in watch mode (ideal during active development), use:
  ```bash
  npm run test
  ```

## Branching Strategy

When creating a new branch, please use a descriptive name and follow these conventions based on the type of your work:

- **Features**: `feature/your-feature-name` (e.g., `feature/add-payment-method`)
- **Bug Fixes**: `bugfix/issue-description` (e.g., `bugfix/fix-auth-timeout`)
- **Documentation**: `docs/update-readme`
- **Chores/Refactoring**: `chore/update-dependencies` or `refactor/clean-up-auth`

## Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for our commit messages. This leads to more readable messages that are easy to follow when looking through the project history.

**Format:**
```text
<type>(<scope>): <subject>

<body>

<footer>
```

**Common types include:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

**Example:**
```text
feat(auth): add signature verification to requests

Added the ability to verify signatures for all incoming requests. 
This resolves issue #42.
```

## Pull Request Process

1. Ensure your code passes all required checks before submitting:
   - Linting: `npm run lint`
   - Formatting: `npm run format:check`
   - Type checking: `npm run typecheck`
   - Tests: `npm run test:run`
2. Update the `README.md` or other documentation with details of changes to the interface, if applicable.
3. Submit a Pull Request targeting the `main` branch.
4. Provide a clear description of the problem your PR solves and the changes you have made.
5. A maintainer will review your PR and may request changes before merging.

Thank you for contributing!
