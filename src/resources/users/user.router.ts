import { AsyncLocalStorage } from 'async_hooks';
import { Router } from 'express';
import { User } from './user.model';
import { userService } from './user.service';
// import usersService from './user.service';

export const usersRouter = Router();

usersRouter
  .route('/')
  .get(async (req, res) => {
    const users = await userService.getAllUsers.run();
    res.json(users);

    // const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    // res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const user = await userService.createUser.run({
      id: '1',
      name: 'ddd',
      login: 'eee',
      password: 'dfdfdf',
    });
    res.json(user);
  });

usersRouter
  .route('/:userId')
  .get(async (req, res) => {})
  .put(async (req, res) => {})
  .delete(async (req, res) => {});
