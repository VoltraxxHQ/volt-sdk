import type { Address, PublicClient, WalletClient, Transport, Chain, Account, CreateTaskParams, Task, VoltClientConfig } from '../types';
import * as taskEscrow from '../contracts/taskEscrow';
import { VoltError } from '../errors/VoltError';
import { validateAddress, validatePositiveBigInt, validateNonEmptyString, validateFutureDeadline } from '../utils/validation';

export class VoltClient {
  private publicClient: PublicClient<Transport, Chain>;
  private walletClient?: WalletClient<Transport, Chain, Account>;
  private contractAddress: Address;

  constructor(config: VoltClientConfig) {
    if (!config.publicClient) {
      throw new VoltError('Public client is required');
    }
    if (!config.contractAddress) {
      throw new VoltError('Contract address is required');
    }
    
    validateAddress(config.contractAddress);

    this.publicClient = config.publicClient;
    this.walletClient = config.walletClient;
    this.contractAddress = config.contractAddress;
  }

  private ensureWalletClient(): WalletClient<Transport, Chain, Account> {
    if (!this.walletClient || !this.walletClient.account) {
      throw new VoltError('Wallet client with an account is required for this operation');
    }
    return this.walletClient;
  }

  // --- Read Methods ---

  async getTask(taskId: bigint): Promise<Task> {
    validatePositiveBigInt(taskId, 'Task ID');
    return await taskEscrow.getTask(this.publicClient, this.contractAddress, taskId);
  }

  async getTaskCount(): Promise<bigint> {
    return await taskEscrow.getTaskCount(this.publicClient, this.contractAddress);
  }

  // --- Write Methods ---

  async createTask(params: CreateTaskParams) {
    const wallet = this.ensureWalletClient();
    validateAddress(params.token, 'Token address');
    validatePositiveBigInt(params.amount, 'Amount');
    validateFutureDeadline(params.deadline);
    validateNonEmptyString(params.metadataUri, 'Metadata URI');

    return await taskEscrow.createTask(wallet, this.contractAddress, params);
  }

  async fundTask(taskId: bigint) {
    const wallet = this.ensureWalletClient();
    validatePositiveBigInt(taskId, 'Task ID');
    return await taskEscrow.fundTask(wallet, this.contractAddress, taskId);
  }

  async assignWorker(taskId: bigint, worker: Address) {
    const wallet = this.ensureWalletClient();
    validatePositiveBigInt(taskId, 'Task ID');
    validateAddress(worker, 'Worker address');
    return await taskEscrow.assignWorker(wallet, this.contractAddress, taskId, worker);
  }

  async submitWork(taskId: bigint) {
    const wallet = this.ensureWalletClient();
    validatePositiveBigInt(taskId, 'Task ID');
    return await taskEscrow.submitWork(wallet, this.contractAddress, taskId);
  }

  async approveWork(taskId: bigint) {
    const wallet = this.ensureWalletClient();
    validatePositiveBigInt(taskId, 'Task ID');
    return await taskEscrow.approveWork(wallet, this.contractAddress, taskId);
  }

  async cancelTask(taskId: bigint) {
    const wallet = this.ensureWalletClient();
    validatePositiveBigInt(taskId, 'Task ID');
    return await taskEscrow.cancelTask(wallet, this.contractAddress, taskId);
  }
}
