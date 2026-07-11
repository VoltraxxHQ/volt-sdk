import { describe, it, expect, vi } from 'vitest';
import { VoltClient } from '../src/client/VoltClient';
import { StrKey } from '@stellar/stellar-sdk';

// Mock SorobanRpc.Server
vi.mock('@stellar/stellar-sdk', async (importOriginal) => {
  const original = await importOriginal() as any;
  return {
    ...original,
    SorobanRpc: {
      Server: vi.fn().mockImplementation(() => ({
        getLatestLedger: vi.fn().mockResolvedValue({ sequence: 12345 }),
        simulateTransaction: vi.fn(),
      })),
      Api: { isSimulationSuccess: vi.fn() },
    },
  };
});

describe('VoltClient', () => {
  // Generate a valid contract ID for testing
  const validContractId = StrKey.encodeContract(Buffer.alloc(32));
  const validSecretKey = 'SA42ZSADT5F2LKKN3B3NPT355O5H2ZQVJFGX7JJYEM7L5JQ3R5JZ7J4T';

  it('should initialize with correct config', () => {
    const client = new VoltClient({
      rpcUrl: 'https://soroban-testnet.stellar.org',
      networkPassphrase: 'Test SDF Network ; September 2015',
      contractId: validContractId,
    });
    expect(client).toBeDefined();
  });

  it('should throw if RPC URL is missing', () => {
    expect(() => new VoltClient({
      networkPassphrase: 'Test SDF Network ; September 2015',
      contractId: validContractId,
    } as any)).toThrow('RPC URL is required');
  });

  it('should throw if contract ID is missing', () => {
    expect(() => new VoltClient({
      rpcUrl: 'https://soroban-testnet.stellar.org',
      networkPassphrase: 'Test SDF Network ; September 2015',
    } as any)).toThrow('Contract ID is required');
  });

  it('should throw if contract ID is invalid', () => {
    expect(() => new VoltClient({
      rpcUrl: 'https://soroban-testnet.stellar.org',
      networkPassphrase: 'Test SDF Network ; September 2015',
      contractId: 'invalid',
    })).toThrow('Invalid Contract ID');
  });

  it('should initialize with secret key', () => {
    const client = new VoltClient({
      rpcUrl: 'https://soroban-testnet.stellar.org',
      networkPassphrase: 'Test SDF Network ; September 2015',
      contractId: validContractId,
      secretKey: validSecretKey,
    });
    expect(client).toBeDefined();
  });

  it('should throw error when createTask called without secret key', async () => {
    const client = new VoltClient({
      rpcUrl: 'https://soroban-testnet.stellar.org',
      networkPassphrase: 'Test SDF Network ; September 2015',
      contractId: validContractId,
    });

    await expect(client.createTask({
      creator: validContractId,
      token: validContractId,
      amount: 100n,
      deadline: BigInt(Math.floor(Date.now() / 1000) + 3600),
      metadataUri: 'ipfs://QmXYZ',
    })).rejects.toThrow('Secret key required for write operations');
  });

  it('should throw error when fundTask called without secret key', async () => {
    const client = new VoltClient({
      rpcUrl: 'https://soroban-testnet.stellar.org',
      networkPassphrase: 'Test SDF Network ; September 2015',
      contractId: validContractId,
    });

    await expect(client.fundTask(1n)).rejects.toThrow('Secret key required for write operations');
  });

  it('should return placeholder value for getTaskCount', async () => {
    const client = new VoltClient({
      rpcUrl: 'https://soroban-testnet.stellar.org',
      networkPassphrase: 'Test SDF Network ; September 2015',
      contractId: validContractId,
    });

    const count = await client.getTaskCount();
    expect(count).toBe(0n);
  });
});
