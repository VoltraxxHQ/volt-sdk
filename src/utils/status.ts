import { TaskStatus } from '../types';

export const getTaskStatusLabel = (status: TaskStatus): string => {
  return TaskStatus[status] || 'Unknown';
};

export const isTerminalTaskStatus = (status: TaskStatus): boolean => {
  return status === TaskStatus.Completed || status === TaskStatus.Cancelled;
};

export const canSubmitTask = (status: TaskStatus): boolean => {
  return status === TaskStatus.Assigned;
};

export const canReleaseTask = (status: TaskStatus): boolean => {
  return status === TaskStatus.Submitted;
};

export const canCancelTask = (status: TaskStatus): boolean => {
  return status === TaskStatus.Created || status === TaskStatus.Funded;
};
