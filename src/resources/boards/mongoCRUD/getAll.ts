import { Board, BoardDB } from '../boards.model';

export const getAll = async (): Promise<Array<Board> | undefined> => {
  const allBoards = await BoardDB.find();
  return allBoards;
};
