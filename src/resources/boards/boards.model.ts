import mongoose from 'mongoose';

export type Board = {
  _id: string;
  title: string;
  columns: Array<string>;
};

const boardShema = new mongoose.Schema<Board>({
  title: { type: String, required: true },
  columns: { type: [String], required: true },
});

export const BoardDB = mongoose.model('Board', boardShema);
