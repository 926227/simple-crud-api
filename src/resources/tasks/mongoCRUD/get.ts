import { Task, TaskDB } from '../tasks.model';

export const get = async (id: string): Promise<Task> => {
  const task = await TaskDB.findById(id);
  if (task) {
    return task;
  } else {
    throw new Error('No such task');
  }
};
