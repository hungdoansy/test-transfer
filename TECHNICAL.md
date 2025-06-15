# Technical Documentation

## Technical Choices

### Frontend Framework: Svelte

- Chosen for its excellent performance and developer experience
- Built-in reactivity system
- Small bundle size
- Great TypeScript support
- Growing popularity & ecosystem

### Styling: Tailwind CSS

- Consistent design system
- Easy responsive design
- Small production bundle size
- Easy to use

### Toast: svelte-5-french-toast

- Lightweight
- Easy to integrate and use

### Number handling: big.js

- Precise decimal arithmetic
- Handles financial calculations accurately
- Prevents floating-point errors
- Supports large numbers with high precision

### State Management: Svelte Stores

- Built-in state management solution

### API Integration

- Type-safe API responses
- Consistent error handling
- Network delay simulation for better UX

### Type Safety: TypeScript

- Static type checking
- Better developer experience
- Improved code readability and maintainability

## Assumptions

1. **API Endpoints**

    - Backend API endpoints are always available and responds after at least 300 milliseconds

2. **Account Management**

    - Account IDs are non-negative integers
    - Maximum account ID: 1,000,000,000
    - Balances are non-negative numbers
    - Maximum decimal places: 10 (for precise financial calculations)

3. **Transfer Rules**

    - Source and destination accounts must be different
    - Sufficient balance is required for transfer
    - No negative transfers allowed
    - Maximum transfer amount: Source account balance
    - Amount can have at most 10 decimal places for precise transfers

4. **Error Handling**

    - Error messages are user-friendly
    - Network errors are handled gracefully
    - Validation errors are shown in place

## Architecture Overview

The application follows a component-based architecture with a separation of concerns:

```
src/
├── components/    # UI Components
├── constants/     # Constants
├── lib/           # Utilities
├── services/      # API Integration
└── stores/        # State Management
```

## Component Architecture

### Core Components

1. **App.svelte**

    - Root component
    - Handles routing and layout
    - Manages global state

2. **CreateAccountModal.svelte**

    - Modal for creating new accounts manually, with form
    - Form validation
    - Error handling
    - Success feedback

3. **TransferForm.svelte**
    - Transfer form component
    - Real-time validation
    - Account selection
    - Transfer amount input
    - Error handling

### UI Components

1. **Button.svelte**

    - Reusable button component
    - Multiple variants
    - Loading/disabled state

2. **Input.svelte**

    - Error display

3. **Modal.svelte**
    - Reusable modal component
    - Click outside to close
    - Escape key to close

## State Management

### Account Store

```typescript
// stores/account.svelte.ts

import { writable } from "svelte/store"

export const accountStore = writable<Account[]>([])

const createAccount = async (accountId: number, balance: string) => {
    // Implementation
}

export const transfer = async (sourceAccountId: number, destinationAccountId: number, amount: string) => {
    // Implementation
}
```

### Service Layer

```typescript
// services/accountService.ts

export async function createAccount(accountId: number, initialBalance: string): Promise<ServiceResponse<Account>> {
    // Implementation
}

export async function getAccountBalance(id: number): Promise<ServiceResponse<Account>> {
    // Implementation
}

export async function createTransaction(transaction: Transaction): Promise<ServiceResponse<Transaction>> {
    // Implementation
}
```

## Data Flow

1. **Account Creation**

    ```
    User Input → Validation → Request Store → API Call → Store Update → UI Update
    ```

2. **Transfer Process**
    ```
    User Input → Validation → Request Store → API Call → Store Update → UI Update
    ```

## Error Types

**Validation Errors**

    - Account ID validation
    - Balance validation
    - Transfer amount validation

## Type System

### Core Types

```typescript
// lib/types.ts
export type Account = {
    account_id: number
    balance: string
}

export type Transaction = {
    source_account_id: number
    destination_account_id: number
    amount: string
}

export type ServiceResponse<T> =
    | {
          success: true
          data: T
      }
    | {
          success: false
          error: string
      }
```

## Number Formatting and Precision

The application supports up to 10 decimal places for precise financial calculations. This is implemented through:

1.  **Validation**

    ```typescript
    const MAXIMUM_FRACTION_LENGTH = 10

    if (value.includes(".")) {
        const fractionalPart = value.split(".")[1]
        if (fractionalPart.length > MAXIMUM_FRACTION_LENGTH) {
            return `Too many decimals. Maximum allowed is ${MAXIMUM_FRACTION_LENGTH} digits after the decimal point.`
        }
    }
    ```

2.  **Display Formatting**

    ```typescript
    export function formatAmount(amount: string) {
        return new Intl.NumberFormat("en-US", {
            useGrouping: "true",
            minimumFractionDigits: 0,
            maximumFractionDigits: MAXIMUM_FRACTION_LENGTH,
        }).format(Number(amount))
    }
    ```

3.  **Storage and Calculations**
    - All amounts are stored as strings to preserve precision
    - Use Big.js library for precise calculations

## API Integration

### Endpoints

Use built-in proxy from Vite to unify API endpoints with `/api` and to avoid CORS

```typescript
proxy: {
    "/api": {
        target: "http://localhost:8860",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ""),
    },
},
```

1. **Create Account**

    - Method: POST
    - Endpoint: `/api/accounts`
    - Body: `{ account_id: number, initial_balance: string }`

2. **Get Account Balance**

    - Method: GET
    - Endpoint: `/api/accounts/:id`
    - Response: `{ account_id: number, balance: string }`

3. **Create Transaction**
    - Method: POST
    - Endpoint: `/api/transactions`
    - Body: `{ source_account_id: number, destination_account_id: number, amount: string }`
