import { Router } from 'express';
import { Task, TaskUrlParams } from './tasks.model';
import { BoardUrlParams } from '../boards/boards.model';
import { tasksService } from './tasks.service';

export const tasksRouter = Router({ mergeParams: true });

tasksRouter.use<BoardUrlParams>((req, res, next) => {
  const boardId = req.params.boardId;

  if (!boardId) {
    throw new Error('Error in paths: boardId is not defined in parent router.');
  }
  next();
});

tasksRouter
  .route('/')
  .get<BoardUrlParams>(async (req, res) => {
    const boardId = req.params.boardId;

    try {
      const response = await tasksService.getAll(boardId);
      res.json(response);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  })
  .post<BoardUrlParams>(async (req, res) => {
    const boardId = req.params.boardId;

    try {
      const postData: Task = {
        ...req.body,
        boardId,
      };
      const response = await tasksService.create(postData);
      res.json(response);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  });

tasksRouter
  .route('/:id')
  .get<TaskUrlParams>(async (req, res) => {
    const id = req.params.id;

    try {
      const response = await tasksService.get(id);
      res.json(response);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  })
  .put<TaskUrlParams>(async (req, res) => {
    const id = req.params.id;

    try {
      const response = await tasksService.update({
        _id: id,
        ...req.body,
      });
      res.json(response);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  })
  .delete<TaskUrlParams>(async (req, res) => {
    const id = req.params.id;

    try {
      const response = await tasksService.del(id);
      res.json(response);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  });
