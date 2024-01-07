import { Sequelize } from 'sequelize-typescript';
import {
  AdvertisementModel,
} from '../models';

const DB_URI = process.env.DB_URI;

export const sequelize = new Sequelize(DB_URI ?? '', {
  models: [
    AdvertisementModel,
  ],
});

export const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('🤖 Data source found captain! 🤖');
  } catch (error) {
    console.error('☠️☠️☠️Unable to connect to the database:', error);
  }
};
