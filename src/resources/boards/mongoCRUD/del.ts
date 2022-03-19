import { Board, BoardDB } from '../boards.model';

export const del = async (id: string): Promise<Board> => {
  const board = await BoardDB.findByIdAndDelete(id);

  if (board) {
    return board;
  } else {
    throw new Error('No such board');
  }
};
