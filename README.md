# Volt SDK ⚡

The official TypeScript SDK for interacting with the Volt task escrow protocol on the **Stellar** network. Built on top of `@stellar/stellar-sdk`, this SDK provides a type-safe, high-level interface for managing task lifecycles, bounty escrows, and interacting with Volt's **Soroban** smart contracts.

---

## Features

- **Type-Safe Client**: A robust `VoltClient` configured with Stellar RPC, network passphrase, and contract parameters.
- **On-chain Task Queries**: Efficient read methods to fetch individual task records and global task statistics directly from Soroban persistent storage.
- **Task Lifecycle Management**: Methods to construct, validate, and sign transactions for creating and funding tasks.
- **Input Validation**: Automatic client-side validation for Stellar addresses, positive BigInts, and future-dated task deadlines.

---

## Installation

Install the Volt SDK and its peer dependency `@stellar/stellar-sdk` using npm:

```bash
npm install @volt-protocol/sdk @stellar/stellar-sdk
```

---

## Getting Started

### 1. Initialize the Client

Initialize `VoltClient` with your Soroban RPC endpoint and contract configurations. Providing a `secretKey` is only required for signing write transactions.

```typescript
import { Networks } from '@stellar/stellar-sdk';
import { VoltClient } from '@volt-protocol/sdk';

const client = new VoltClient({
  rpcUrl: 'https://soroban-testnet.stellar.org',
  networkPassphrase: Networks.TESTNET,
  contractId: 'C...', // Valid Stellar Contract Address
  secretKey: 'S...'   // Optional: Required for write operations
});
```

### 2. Read Task Data

Fetch the details of an existing task or retrieve the total count of tasks registered on-chain:

```typescript
// Fetch task details by unique BigInt ID
const taskId = 1n;
const task = await client.getTask(taskId);

console.log(`Creator: ${task.creator}`);
console.log(`Bounty Amount: ${task.amount.toString()} base units`);
console.log(`Deadline: ${new Date(Number(task.deadline) * 1000).toLocaleString()}`);
console.log(`Status: ${task.status}`);

// Get total task count
const totalTasks = await client.getTaskCount();
console.log(`Total Tasks: ${totalTasks}`);
```

### 3. Write Operations (Creating & Funding Tasks)

To submit state-changing transactions, ensure you have initialized the client with a valid `secretKey`.

```typescript
// Create a new task
const txHash = await client.createTask({
  token: 'C...',         // Stellar Asset Contract Address
  amount: 100000000n,    // Bounty amount in base units
  deadline: 1800000000n, // Future Unix timestamp
  metadataUri: 'https://ipfs.io/ipfs/Qm...'
});
console.log(`Task created. Transaction: ${txHash}`);

// Fund the task escrow
const fundTxHash = await client.fundTask(1n);
console.log(`Task funded. Transaction: ${fundTxHash}`);
```

---

## API Reference

### `VoltClient`

#### `constructor(config: VoltClientConfig)`
Initializes the RPC connection and validates the contract address.
- `config.rpcUrl`: URL of the Soroban RPC server.
- `config.networkPassphrase`: Stellar network passphrase (e.g., `Networks.TESTNET`).
- `config.contractId`: Contract address.
- `config.secretKey` (Optional): The secret key of the signing account.

#### `getTask(taskId: bigint): Promise<Task>`
Retrieves metadata, escrow balances, and completion state for a given task ID.

#### `getTaskCount(): Promise<bigint>`
Returns the total number of tasks created.

#### `createTask(params: CreateTaskParams): Promise<string>`
Validates parameters, builds, simulates, and signs a transaction to register a new task. Returns the transaction hash.

#### `fundTask(taskId: bigint): Promise<string>`
Transfers the bounty amount from the creator's account to the contract escrow. Returns the transaction hash.

---

## Development

### Prerequisites
- Node.js (v20+)
- npm

### Build
Compile the TypeScript source code into distribution assets:
```bash
npm run build
```

### Test
Execute the test suite using Vitest:
```bash
npm run test
```

### Formatting and Linting
Format the codebase and check for static analysis errors:
```bash
# Check format
npm run format:check

# Format files
npm run format

# Run linter
npm run lint

# Typecheck TypeScript files
npm run typecheck
```

---

## Security Notice

This SDK is in an early stage of development and interacts with unaudited smart contracts. Always verify contract IDs and address configurations prior to executing write transactions on live networks. Refer to [SECURITY.md](SECURITY.md) for vulnerability reporting procedures.

---

## License

This project is licensed under the [MIT License](LICENSE).
