import mongoose from 'mongoose';
import { BoardUrlParams } from '../boards/boards.model';

export type TaskUrlParams = BoardUrlParams & {
  id: string;
};

export type Task = {
  _id: string;
  title: string;
  order: string;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
};

const taskShema = new mongoose.Schema<Task>({
  title: { type: String, required: true },
  order: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: Object, required: false },
  boardId: { type: String, required: true },
  columnId: { type: String, required: true },
});

export const TaskDB = mongoose.model('Task', taskShema);
