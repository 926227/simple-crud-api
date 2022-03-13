import config from './common/config';
import app from './app';

const { port } = config;

app.listen(port, () =>
  console.log(`App is running on http://localhost:${port}`)
);
