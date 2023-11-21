import express from 'express';
import bodyParser from 'body-parser';
import knex from './knexfile';
import userController from './user/user.controller';

const app = express();

app.use(bodyParser.json());

app.get('/health', async (req, res) => {
  try {
    await knex.raw('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    console.error('Database Health Check Error:', error);
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

app.use(userController);

app.listen(process.env.PORT, () => {
  const env = process.env.NODE_ENV;
  const name = env.charAt(0).toUpperCase() + env.slice(1);
  console.log(`${name} server is running on http://localhost:${process.env.PORT}`);
});
