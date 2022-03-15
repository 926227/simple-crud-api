import mongoose from 'mongoose';
import config from './common/config';
import app from './app';

const { port, dbuser, dbpass } = config;

const start = async () => {
  try {
    const uri = `mongodb://${dbuser}:${dbpass}@cluster0-shard-00-00.fhuqv.mongodb.net:27017,cluster0-shard-00-01.fhuqv.mongodb.net:27017,cluster0-shard-00-02.fhuqv.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-jk9rq8-shard-0&authSource=admin&retryWrites=true&w=majority`;

    await mongoose.connect(uri);

    app.listen(port, () =>
      console.log(`App is running on http://localhost:${port}`)
    );
  } catch (e) {
    console.log((e as Error).message);
  }
};

start();
