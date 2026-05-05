import { describe, it, expect } from 'vitest';
import { validateAddress, validatePositiveBigInt, validateNonEmptyString, validateFutureDeadline } from '../src/utils/validation';

describe('validation utilities', () => {
  it('should validate correct addresses', () => {
    expect(() => validateAddress('0x1234567890123456789012345678901234567890')).not.toThrow();
  });

  it('should throw on invalid addresses', () => {
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
