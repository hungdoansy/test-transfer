# Account Transfer Application

A sample web application for managing accounts and transferring funds between them. Built with Svelte 5, Vite 6, TypeScript 5, and Tailwind 3.

## Features

- Create new accounts with initial balance (randomly or manually)
- Transfer funds between accounts

## Prerequisites

- Node.js (^18)
- pnpm (^9)

## Getting Started

1. Clone the repository:

    ```bash
    git clone git@github.com:hungdoansy/test-transfer.git
    cd test-transfer
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

3. Start the development server:

    ```bash
    pnpm dev
    ```

4. Start the backend API server at `http://localhost:8860`

5. Open your browser and navigate to `http://localhost:3008`

## Project Structure

```
src/
├── assets/        # Static assets
├── components/    # UI components
│   ├── ui/        # Atomic UI components
│   └── ...        # Feature-specific components
├── constants/     # Global application constants
├── lib/           # Utility functions
├── services/      # API integration
├── stores/        # State management
└── App.svelte     # Root component
```

## Development

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint

# Format code
pnpm format
```

## Technical Choices

View TECHNICAL.md
