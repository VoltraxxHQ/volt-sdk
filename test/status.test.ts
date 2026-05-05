import { describe, it, expect } from 'vitest';
import { TaskStatus } from '../src/types';
import { getTaskStatusLabel, isTerminalTaskStatus, canSubmitTask, canCancelTask } from '../src/utils/status';

describe('status utilities', () => {
  it('should return correct labels', () => {
    expect(getTaskStatusLabel(TaskStatus.Created)).toBe('Created');
    expect(getTaskStatusLabel(TaskStatus.Completed)).toBe('Completed');
    expect(getTaskStatusLabel(99 as any)).toBe('Unknown');
  });

  it('should identify terminal statuses', () => {
    expect(isTerminalTaskStatus(TaskStatus.Completed)).toBe(true);
    expect(isTerminalTaskStatus(TaskStatus.Cancelled)).toBe(true);
    expect(isTerminalTaskStatus(TaskStatus.Funded)).toBe(false);
  });

  it('should correctly determine if work can be submitted', () => {
    expect(canSubmitTask(TaskStatus.Assigned)).toBe(true);
    expect(canSubmitTask(TaskStatus.Funded)).toBe(false);
  });

  it('should correctly determine if task can be cancelled', () => {
    expect(canCancelTask(TaskStatus.Created)).toBe(true);
    expect(canCancelTask(TaskStatus.Funded)).toBe(true);
    expect(canCancelTask(TaskStatus.Assigned)).toBe(false);
  });
});
