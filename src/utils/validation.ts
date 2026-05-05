import { StrKey } from '@stellar/stellar-sdk';
import { VoltError } from '../errors/VoltError';

export const validateAddress = (address: string, label: string = 'Address') => {
  if (!StrKey.isValidEd25519PublicKey(address) && !StrKey.isValidContract(address)) {
    throw new VoltError(`Invalid ${label}: ${address}`);
  }
};

export const validatePositiveBigInt = (value: bigint, label: string = 'Value') => {
  if (value <= 0n) {
    throw new VoltError(`${label} must be a positive bigint`);
  }
};

export const validateNonEmptyString = (value: string, label: string = 'Value') => {
  if (!value || value.trim().length === 0) {
    throw new VoltError(`${label} cannot be empty`);
  }
};

export const validateFutureDeadline = (deadline: bigint) => {
  const now = BigInt(Math.floor(Date.now() / 1000));
  if (deadline <= now) {
    throw new VoltError('Deadline must be in the future');
  }
};
