'use strict';

import { Request, Response } from 'express';

export type AdvertisementType = {
    id: string;
    name: string;
    location: string;
		coords: string;
    imageUrl: string;
		price: string;
		desc: string;
};

export type ControllerAction = (req: Request, res: Response) => void;

export interface QueryParams {
  sort?: string;
  page?: string;
  perPage?: string;
}

export interface ImgbbResponseData {
  data: {
    url: string;
  };
}
