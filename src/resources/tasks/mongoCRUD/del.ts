import { Task, TaskDB } from '../tasks.model';

export const del = async (id: string): Promise<Task> => {
  const task = await TaskDB.findByIdAndDelete(id);

  if (task) {
    return task;
  } else {
    throw new Error('No such task');
  }
};
