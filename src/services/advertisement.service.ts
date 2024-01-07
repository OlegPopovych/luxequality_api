'use strict';

import { AdvertisementModel } from '../models';
import { AdvertisementType } from '../types';

export const getByCoords = async (coords: string): Promise<AdvertisementType | null> =>
  AdvertisementModel.findOne({
    where: {
      coords,
    }
  });

export const getAll = async (): Promise<AdvertisementType[] | null> =>
  AdvertisementModel.findAll({});

export const create = async (name: string, location: string, imageUrl: string, price: string, desc: string, coords: number[]) => {
  AdvertisementModel.create({ name, location, imageUrl, price, desc, coords });
};
