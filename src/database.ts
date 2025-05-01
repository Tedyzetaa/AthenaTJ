import { Sequelize } from 'sequelize';
import { env } from './env';

export const sequelize = new Sequelize(env.DB_URL, {
  logging: msg => console.log(msg),
});