import { SorobanRpc, Address } from '@stellar/stellar-sdk';

export type { Address };

export enum TaskStatus {
  Created = 0,
  Funded = 1,
  Assigned = 2,
  Submitted = 3,
  Completed = 4,
  Cancelled = 5,
}

export interface Task {
  creator: string;
  worker?: string;
  token: string;
  amount: bigint;
  deadline: bigint;
  status: TaskStatus;
  metadataUri: string;
}

export interface VoltClientConfig {
  rpcUrl: string;
  networkPassphrase: string;
  contractId: string;
  secretKey?: string;
}

export interface CreateTaskParams {
  creator: string;
  token: string;
  amount: bigint;
  deadline: bigint;
  metadataUri: string;
}
