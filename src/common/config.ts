import 'dotenv/config';

const config = {
  port: 4000,
  dbuser: process.env.MONGOUSER,
  dbpass: process.env.MONGOPASS,
};

export default config;
