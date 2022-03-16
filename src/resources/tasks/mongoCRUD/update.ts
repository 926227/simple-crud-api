import { Task, TaskDB } from '../tasks.model';

export const update = async (task: Partial<Task>): Promise<Task> => {
  const taskUpdated = await TaskDB.findByIdAndUpdate(task._id, task, {
    returnDocument: 'after',
  });
  if (taskUpdated) {
    return taskUpdated;
  } else {
    throw new Error('No such task');
  }
};
