'use strict';

import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();
import { AdvertisementModel } from '../../models';

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

connect();

const initial = [{
  'name': 'Hotel',
  'location': 'I am here',
  'imageUrl': 'https://i.ibb.co/xH17XQb/hotel-1.jpg',
  'coords': JSON.stringify([49, 24]),
  'price': '100',
  'desc': 'Nice Apartment',
}];

export const seedPhones = async () => {
  return AdvertisementModel.bulkCreate(initial);
};

sequelize
  .sync(
    { force: true }
  )
  .then(() => {
    seedPhones();
    console.log('Оголошення засіяно!');
  })
  .catch((err) => {
    console.error('Сіяло зламалось!!!:', err);
  });
