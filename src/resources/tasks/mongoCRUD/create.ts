import { Task, TaskDB } from '../tasks.model';

export const create = async (data: Task): Promise<Task | undefined> => {
  const task = await TaskDB.create(data);
  if (task) {
    return task;
  } else {
    throw new Error('Can not create task');
  }
};
