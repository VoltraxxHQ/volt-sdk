/**
 * Validation Utilities
 */
import { StrKey } from '@stellar/stellar-sdk';
import { VoltError } from '../errors/VoltError';

/**
 * Validates a Stellar address (Ed25519 Public Key or Contract ID)
 * @param address The address string to validate
 * @param label A label for the address (used in error messages)
 * @throws VoltError if the address is invalid
 */
export const validateAddress = (address: string, label: string = 'Address') => {
  // Check if it's a valid public key or a valid contract ID
  if (!StrKey.isValidEd25519PublicKey(address) && !StrKey.isValidContract(address)) {
    throw new VoltError(`Invalid ${label}: ${address}`);
  }
};

/**
 * Validates that a bigint value is strictly positive
 * @param value The bigint to check
 * @param label A label for the value
 * @throws VoltError if the value is not positive
 */
export const validatePositiveBigInt = (value: bigint, label: string = 'Value') => {
  // Ensure the value is greater than zero
  if (value <= 0n) {
    throw new VoltError(`${label} must be a positive bigint`);
  }
};

/**
 * Validates that a string is not empty or just whitespace
 * @param value The string to check
 * @param label A label for the value
 * @throws VoltError if the string is empty
 */
export const validateNonEmptyString = (value: string, label: string = 'Value') => {
  // Check for null, undefined, or empty string
  if (!value || value.trim().length === 0) {
    throw new VoltError(`${label} cannot be empty`);
  }
};

/**
 * Validates that a Unix timestamp (in seconds) is in the future
 * @param deadline The deadline timestamp to check
 * @throws VoltError if the deadline is in the past or now
 */
export const validateFutureDeadline = (deadline: bigint) => {
  // Get current time in seconds
  const now = BigInt(Math.floor(Date.now() / 1000));
  
  // Compare deadline to current time
  if (deadline <= now) {
    throw new VoltError('Deadline must be in the future');
  }
};
