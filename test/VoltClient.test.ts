import { describe, it, expect, vi } from 'vitest';
import { VoltClient } from '../src/client/VoltClient';
import type { PublicClient, WalletClient, Address } from '../src/types';

describe('VoltClient', () => {
  const mockAddress: Address = '0x1234567890123456789012345678901234567890';
  
  const mockPublicClient = {
    readContract: vi.fn(),
  } as unknown as PublicClient;

  const mockWalletClient = {
    writeContract: vi.fn(),
    account: { address: mockAddress },
  } as unknown as WalletClient;

  it('should initialize with correct config', () => {
    const client = new VoltClient({
      publicClient: mockPublicClient,
      contractAddress: mockAddress,
    });
    expect(client).toBeDefined();
  });

  it('should throw if public client is missing', () => {
    expect(() => new VoltClient({ contractAddress: mockAddress } as any)).toThrow('Public client is required');
  });

  it('should throw if contract address is invalid', () => {
    expect(() => new VoltClient({ publicClient: mockPublicClient, contractAddress: 'invalid' } as any)).toThrow('Invalid Address');
  });

  it('should call getTaskCount correctly', async () => {
    const client = new VoltClient({
      publicClient: mockPublicClient,
      contractAddress: mockAddress,
    });

    vi.mocked(mockPublicClient.readContract).mockResolvedValue(5n);
    
    const count = await client.getTaskCount();
    expect(count).toBe(5n);
    expect(mockPublicClient.readContract).toHaveBeenCalledWith(expect.objectContaining({
      functionName: 'taskCount',
    }));
  });

  it('should throw error when write method called without wallet client', async () => {
    const client = new VoltClient({
      publicClient: mockPublicClient,
      contractAddress: mockAddress,
    });

    await expect(client.fundTask(1n)).rejects.toThrow('Wallet client with an account is required');
  });
});
