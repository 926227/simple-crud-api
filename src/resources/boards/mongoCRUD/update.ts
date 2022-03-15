import { Board, BoardDB } from '../boards.model';

export const update = async (board: Partial<Board>): Promise<Board> => {
  const boardUpdated = await BoardDB.findByIdAndUpdate(board._id, board, {
    returnDocument: 'after',
  });
  if (boardUpdated) {
    return boardUpdated;
  } else {
    throw new Error('No such board');
  }
};
