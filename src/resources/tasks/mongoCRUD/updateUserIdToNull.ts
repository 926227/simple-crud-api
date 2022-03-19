import { Task, TaskDB } from '../tasks.model';

export const updateUserIdToNull = async (userId: string): Promise<number> => {
  const { modifiedCount } = await TaskDB.updateMany({ userId }, { userId: null })
  return modifiedCount
}