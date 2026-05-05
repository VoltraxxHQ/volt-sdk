import { voltTaskEscrowAbi } from '../abi/VoltTaskEscrow';
import type { Address, PublicClient, WalletClient, Transport, Chain, Account, CreateTaskParams, Task } from '../types';

export const getTask = async (
  publicClient: PublicClient<Transport, Chain>,
  contractAddress: Address,
  taskId: bigint
): Promise<Task> => {
  const data = await publicClient.readContract({
    address: contractAddress,
    abi: voltTaskEscrowAbi,
    functionName: 'getTask',
    args: [taskId],
  });
  return data as Task;
};

export const getTaskCount = async (
  publicClient: PublicClient<Transport, Chain>,
  contractAddress: Address
): Promise<bigint> => {
  return await publicClient.readContract({
    address: contractAddress,
    abi: voltTaskEscrowAbi,
    functionName: 'taskCount',
  });
};

export const createTask = async (
  walletClient: WalletClient<Transport, Chain, Account>,
  contractAddress: Address,
  params: CreateTaskParams
) => {
  return await walletClient.writeContract({
    address: contractAddress,
    abi: voltTaskEscrowAbi,
    functionName: 'createTask',
    args: [params.token, params.amount, params.deadline, params.metadataUri],
    account: walletClient.account,
  });
};

export const fundTask = async (
  walletClient: WalletClient<Transport, Chain, Account>,
  contractAddress: Address,
  taskId: bigint
) => {
  return await walletClient.writeContract({
    address: contractAddress,
    abi: voltTaskEscrowAbi,
    functionName: 'fundTask',
    args: [taskId],
    account: walletClient.account,
  });
};

export const assignWorker = async (
  walletClient: WalletClient<Transport, Chain, Account>,
  contractAddress: Address,
  taskId: bigint,
  worker: Address
) => {
  return await walletClient.writeContract({
    address: contractAddress,
    abi: voltTaskEscrowAbi,
    functionName: 'assignWorker',
    args: [taskId, worker],
    account: walletClient.account,
  });
};

export const submitWork = async (
  walletClient: WalletClient<Transport, Chain, Account>,
  contractAddress: Address,
  taskId: bigint
) => {
  return await walletClient.writeContract({
    address: contractAddress,
    abi: voltTaskEscrowAbi,
    functionName: 'submitWork',
    args: [taskId],
    account: walletClient.account,
  });
};

export const approveWork = async (
  walletClient: WalletClient<Transport, Chain, Account>,
  contractAddress: Address,
  taskId: bigint
) => {
  return await walletClient.writeContract({
    address: contractAddress,
    abi: voltTaskEscrowAbi,
    functionName: 'approveWork',
    args: [taskId],
    account: walletClient.account,
  });
};

export const cancelTask = async (
  walletClient: WalletClient<Transport, Chain, Account>,
  contractAddress: Address,
  taskId: bigint
) => {
  return await walletClient.writeContract({
    address: contractAddress,
    abi: voltTaskEscrowAbi,
    functionName: 'cancelTask',
    args: [taskId],
    account: walletClient.account,
  });
};
