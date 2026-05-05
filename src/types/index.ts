import type { Address, Account, Chain, PublicClient, WalletClient, Transport, Hex } from 'viem';

export type { Address, Account, Chain, PublicClient, WalletClient, Transport, Hex };

export enum TaskStatus {
  Created = 0,
  Funded = 1,
  Assigned = 2,
  Submitted = 3,
  Completed = 4,
  Cancelled = 5,
}

export interface Task {
  creator: Address;
  worker: Address;
  token: Address;
  amount: bigint;
  deadline: bigint;
  status: TaskStatus;
  metadataUri: string;
}

export interface VoltClientConfig {
  publicClient: PublicClient<Transport, Chain>;
  walletClient?: WalletClient<Transport, Chain, Account>;
  contractAddress: Address;
}

export interface CreateTaskParams {
  token: Address;
  amount: bigint;
  deadline: bigint;
  metadataUri: string;
}
