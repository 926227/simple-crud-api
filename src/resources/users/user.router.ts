import { Router } from 'express';
import { userService } from './user.service';

export const usersRouter = Router();

usersRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  })
  .post(async (req, res) => {
    try {
      const user = await userService.createUser(req.body);
      res.json(user);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  });

usersRouter
  .route('/:userId')
  .get(async (req, res) => {
    try {
      const result = await userService.getUser(req.params.userId);
      res.json(result);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  })
  .put(async (req, res) => {
    try {
      const result = await userService.updateUser({
        _id: req.params.userId,
        ...req.body,
      });
      res.json(result);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  })
  .delete(async (req, res) => {
    try {
      const result = await userService.deleteUser(req.params.userId);
      res.json(result);
    } catch (e) {
      res.status(400).send((e as Error).message);
    }
  });
