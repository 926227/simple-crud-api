import { Router } from 'express';
import { tasksRouter } from '../tasks/tasks.router';
import { boardsService } from './boards.service';

export const boardsRouter = Router();

boardsRouter.use('/:boardId/tasks', tasksRouter);

boardsRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const response = await boardsService.getAll();
      res.json(response);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  })
  .post(async (req, res) => {
    try {
      const response = await boardsService.create(req.body);
      res.json(response);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  });

boardsRouter
  .route('/:id')
  .get(async (req, res) => {
    try {
      const response = await boardsService.get(req.params.id);
      res.json(response);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  })
  .put(async (req, res) => {
    try {
      const response = await boardsService.update({
        _id: req.params.id,
        ...req.body,
      });
      res.json(response);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  })
  .delete(async (req, res) => {
    try {
      const response = await boardsService.del(req.params.id);
      res.json(response);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  });
