import { describe, it, expect, vi } from 'vitest';
import { validateAddress, validatePositiveBigInt, validateNonEmptyString, validateFutureDeadline } from '../src/utils/validation';
import { StrKey } from '@stellar/stellar-sdk';

describe('validation utilities', () => {
  it('should validate correct Stellar public keys', () => {
    const validPublicKey = StrKey.encodeEd25519PublicKey(Buffer.alloc(32));
    expect(() => validateAddress(validPublicKey)).not.toThrow();
  });

  it('should validate correct Stellar contract addresses', () => {
    const validContractId = StrKey.encodeContract(Buffer.alloc(32));
    expect(() => validateAddress(validContractId)).not.toThrow();
  });

  it('should throw on invalid addresses', () => {
    expect(() => validateAddress('invalid')).toThrow('Invalid Address');
    expect(() => validateAddress('0xinvalid')).toThrow('Invalid Address');
  });

  it('should validate positive bigints', () => {
    expect(() => validatePositiveBigInt(100n)).not.toThrow();
  });

  it('should throw on zero or negative bigints', () => {
    expect(() => validatePositiveBigInt(0n)).toThrow('must be a positive bigint');
    expect(() => validatePositiveBigInt(-1n)).toThrow('must be a positive bigint');
  });

  it('should validate non-empty strings', () => {
    expect(() => validateNonEmptyString('hello')).not.toThrow();
  });

  it('should throw on empty or whitespace strings', () => {
    expect(() => validateNonEmptyString('')).toThrow('cannot be empty');
    expect(() => validateNonEmptyString('  ')).toThrow('cannot be empty');
  });

  it('should validate future deadlines', () => {
    const future = BigInt(Math.floor(Date.now() / 1000) + 3600);
    expect(() => validateFutureDeadline(future)).not.toThrow();
  });

  it('should throw on past or current deadlines', () => {
    const past = BigInt(Math.floor(Date.now() / 1000) - 3600);
    expect(() => validateFutureDeadline(past)).toThrow('Deadline must be in the future');
  });
});
