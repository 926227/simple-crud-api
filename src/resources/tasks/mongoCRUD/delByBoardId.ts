import { TaskDB } from '../tasks.model';

export const delByBoardId = async (boardId: string): Promise<number> => {
  const { deletedCount } = await TaskDB.deleteMany({ boardId })
  return deletedCount

}