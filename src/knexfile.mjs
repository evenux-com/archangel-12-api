import { config } from 'dotenv';
import knex from 'knex';

config();

const knexInstance = knex({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
  },
  debug: process.env.NODE_ENV === 'production',
});

export default knexInstance;
