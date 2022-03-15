import { Board, BoardDB } from '../boards.model';

export const get = async (id: string): Promise<Board> => {
  const board = await BoardDB.findById(id);
  if (board) {
    return board;
  } else {
    throw new Error('No such board');
  }
};
