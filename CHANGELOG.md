# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-05-05

### Added
- Initial MVP SDK client `VoltClient`.
- Full TypeScript support with `viem` integration.
- Typed ABI for the `VoltTaskEscrow` contract.
- Task management methods: `createTask`, `fundTask`, `assignWorker`, `submitWork`, `approveWork`, `cancelTask`.
- View methods: `getTask`, `getTaskCount`.
- Task status utility helpers.
- Parameter validation utilities.
- Comprehensive Vitest test suite.
- GitHub Actions CI workflow.
