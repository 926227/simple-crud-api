import { Router } from 'express';
import { userService } from './user.service';

export const usersRouter = Router();

usersRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const users = await userService.getAll();
      res.json(users);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  })
  .post(async (req, res) => {
    try {
      const user = await userService.create(req.body);
      res.json(user);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  });

usersRouter
  .route('/:id')
  .get(async (req, res) => {
    try {
      const result = await userService.get(req.params.id);
      res.json(result);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  })
  .put(async (req, res) => {
    try {
      const result = await userService.update({
        _id: req.params.id,
        ...req.body,
      });
      res.json(result);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  })
  .delete(async (req, res) => {
    try {
      const result = await userService.del(req.params.id);
      res.json(result);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  });
