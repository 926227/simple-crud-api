import express from 'express';
// import swaggerUI from 'swagger-ui-express';
import path from 'path';
import { boardsRouter } from './resources/boards/boards.router';
import { tasksRouter } from './resources/tasks/tasks.router';
// import YAML from 'yamljs';
import { usersRouter } from './resources/users/user.router';

const app = express();
// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', usersRouter);
app.use('/boards', boardsRouter);
app.use((req, res, next) => {
  res.status(404).send('Page not found');
  next();
});

export default app;
