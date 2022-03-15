import { Board, BoardDB } from '../boards.model';

export const create = async (data: Board): Promise<Board | undefined> => {
  const board = await BoardDB.create(data);
  if (board) {
    return board;
  } else {
    throw new Error('Can not create board');
  }
};
