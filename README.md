# Volt SDK ⚡ (Stellar)

The official TypeScript SDK for interacting with the Volt task escrow protocol on the **Stellar** network. Volt is an early-stage protocol for decentralized task management and on-chain bounty settlement using **Soroban** smart contracts.

## Overview

The Volt SDK provides a high-level, type-safe interface for managing task lifecycles on Stellar. Built on top of `@stellar/stellar-sdk`, it handles contract interactions, parameter validation, and status management for the Volt protocol.

### MVP Scope

The current version of the SDK supports:
- **Client Initialization**: Configure with RPC URL, network passphrase, and contract ID.
- **Task Management**: Create, fund, assign, submit, and approve tasks.
- **Escrow Settlement**: Release funds to workers or cancel unassigned tasks.
- **Protocol Data**: Fetch individual task details and total task counts from Soroban storage.
- **Type Safety**: Full TypeScript support for Stellar addresses and task structures.

### Current Limitations

- **Backend Integration**: This MVP version does not yet include a client for the Volt backend API.
- **Audits**: The related smart contracts are currently unaudited.
- **Write Methods**: Transaction building and submission are in early stage; users should ensure they have sufficient XLM for fees.

## Installation

```bash
npm install @volt-protocol/sdk @stellar/stellar-sdk
```

## Quick Start

### 1. Initialize the Client

```typescript
import { Networks } from '@stellar/stellar-sdk';
import { VoltClient } from '@volt-protocol/sdk';

const client = new VoltClient({
  rpcUrl: 'https://soroban-testnet.stellar.org',
  networkPassphrase: Networks.TESTNET,
  contractId: 'C...',
  secretKey: 'S...' // Optional for read-only operations
});
```

### 2. Read Task Data

```typescript
const taskId = 1n;
const task = await client.getTask(taskId);
console.log(`Task Creator: ${task.creator}`);
console.log(`Bounty Amount: ${task.amount.toString()}`);
```

## Development

### Build
```bash
npm run build
```

### Test
```bash
npm run test
```

## Security Notice
The Volt SDK is in an early stage of development. The underlying Soroban contracts are unaudited. Always verify contract IDs before interacting with the protocol. Refer to [SECURITY.md](SECURITY.md) for more information.

## License
This project is licensed under the [MIT License](LICENSE).
