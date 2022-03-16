import { Task, TaskDB } from '../tasks.model';

export const getAll = async (): Promise<Array<Task> | undefined> => {
  const allTasks = await TaskDB.find();
  return allTasks;
};
