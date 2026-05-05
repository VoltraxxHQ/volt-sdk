# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2026-05-05
### Changed
- Migrated SDK from `viem`/EVM to `@stellar/stellar-sdk`.
- Updated `VoltClient` to support Soroban RPC and Stellar transaction building.
- Updated address validation to use Stellar's `StrKey`.

## [0.1.0] - 2026-05-05
### Added
- Initial MVP SDK client (Legacy EVM version).
- Task read/write helpers and status utilities.
