# Volt SDK ⚡

The official TypeScript SDK for interacting with the Volt task escrow protocol. Volt is an early-stage protocol for decentralized task management and on-chain bounty settlement.

## Overview

The Volt SDK provides a high-level, type-safe interface for managing task lifecycles on-chain. Built on top of `viem`, it handles contract interactions, parameter validation, and status management for the Volt protocol.

### MVP Scope

The current version of the SDK supports:
- **Client Initialization**: Configure with public/wallet clients and contract addresses.
- **Task Management**: Create, fund, assign, submit, and approve tasks.
- **Escrow Settlement**: Release funds to workers or cancel unassigned tasks.
- **Protocol Data**: Fetch individual task details and total task counts.
- **Type Safety**: Full TypeScript support for task structures and status enums.

### Current Limitations

- **Backend Integration**: This MVP version does not yet include a client for the Volt backend API.
- **Native ETH**: Only ERC20-based bounties are supported in this release.
- **Dispute Resolution**: On-chain dispute and arbitration helpers are not yet implemented.
- **Audits**: The related smart contracts are currently unaudited.

## Installation

```bash
npm install @volt-protocol/sdk viem
```

## Quick Start

### 1. Initialize the Client

```typescript
import { createPublicClient, createWalletClient, http, custom } from 'viem';
import { mainnet } from 'viem/chains';
import { VoltClient } from '@volt-protocol/sdk';

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
});

const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
});

const client = new VoltClient({
  publicClient,
  walletClient,
  contractAddress: '0xYourContractAddress'
});
```

### 2. Read Task Data

```typescript
const taskId = 1n;
const task = await client.getTask(taskId);
console.log(`Task Creator: ${task.creator}`);
console.log(`Bounty Amount: ${task.amount.toString()}`);

const totalTasks = await client.getTaskCount();
```

### 3. Create and Fund a Task

```typescript
// Create task
const txHash = await client.createTask({
  token: '0xTokenAddress',
  amount: 100n * 10n**18n,
  deadline: BigInt(Math.floor(Date.now() / 1000) + 86400 * 7), // 1 week
  metadataUri: 'ipfs://your-task-details'
});

// Fund task (requires taskId from events or state)
await client.fundTask(taskId);
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

The Volt SDK is in an early stage of development. The underlying smart contracts are unaudited. Always verify contract addresses before interacting with the protocol. Refer to [SECURITY.md](SECURITY.md) for more information.

## License

This project is licensed under the [MIT License](LICENSE).
