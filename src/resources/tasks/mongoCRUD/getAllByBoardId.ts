import { Task, TaskDB } from '../tasks.model';

export const getAllByBoardId = async (
  boardId: string
): Promise<Array<Task> | undefined> => {
  const allTasks = await TaskDB.find({ boardId });
  return allTasks;
};
