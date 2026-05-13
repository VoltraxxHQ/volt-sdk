/**
 * Type Definitions for Volt SDK
 */
import { SorobanRpc, Address } from '@stellar/stellar-sdk';

// Re-export Address type for convenience
export type { Address };

/**
 * TaskStatus Enum
 * Represents the current lifecycle stage of a task
 */
export enum TaskStatus {
  Created = 0,   // Task record created on-chain
  Funded = 1,    // Tokens locked in escrow for the task
  Assigned = 2,  // A worker has been assigned to the task
  Submitted = 3, // Worker has submitted proof of work
  Completed = 4, // Work verified and payment released
  Cancelled = 5, // Task cancelled and funds returned to creator
}

/**
 * Task Interface
 * Represents the full state of a task as stored on-chain
 */
export interface Task {
  creator: string;       // Address of the task creator
  worker?: string;      // Address of the assigned worker (if any)
  token: string;        // Address of the token used for bounty
  amount: bigint;       // Bounty amount in atomic units
  deadline: bigint;     // Unix timestamp (seconds) after which task expires
  status: TaskStatus;   // Current status of the task
  metadataUri: string;  // URI pointing to task details (e.g., IPFS hash)
}

/**
 * VoltClientConfig Interface
 * Configuration options for initializing the VoltClient
 */
export interface VoltClientConfig {
  rpcUrl: string;             // URL of the Soroban RPC server
  networkPassphrase: string;  // Stellar network passphrase (e.g., Testnet)
  contractId: string;         // Address of the Volt smart contract
  secretKey?: string;         // Optional: Private key for signing transactions
}

/**
 * CreateTaskParams Interface
 * Input parameters required to create a new task
 */
export interface CreateTaskParams {
  creator: string;      // Address of the user creating the task
  token: string;        // Token address for the bounty
  amount: bigint;       // Bounty amount
  deadline: bigint;     // Expiration timestamp
  metadataUri: string;  // URI for task metadata
}
