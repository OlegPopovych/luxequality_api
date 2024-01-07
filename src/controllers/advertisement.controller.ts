'use strict';

import axios from 'axios';
import { AxiosResponse } from 'axios';
import multer from 'multer';
import FormData from 'form-data';

import dotenv from 'dotenv';

import {
  ControllerAction, ImgbbResponseData,
} from '../types';
import * as advertisementService from '../services/advertisement.service';

dotenv.config();

const apiKey = process.env.IMGBB_API_key_v2;

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const create: ControllerAction = async (req, res) => {
  try {
    upload.single('photo')(req, res, async (err: any) => {
      const { name, location, price, desc, coords } = req.body;

      if (!name || !location || !price || !desc || !coords) {
        res.status(400).json({ success: false, error: 'Invalid data' });

        return;
      }

      if (err) {
        console.error('Error handling file upload:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
        return;
      }

      const photo = req.file as Express.Multer.File;

      const url = 'https://api.imgbb.com/1/upload';

      const form = new FormData();
      form.append('key', apiKey);
      form.append('image', photo.buffer, { filename: photo.originalname });

      const headers = {
        ...form.getHeaders(),
      };

      const imgbbResponse: AxiosResponse<ImgbbResponseData> = await axios.post(url, form, { headers });

      const imageUrl = imgbbResponse.data.data.url;

      const newelEment = await advertisementService.create(
        name,
        location,
        imageUrl,
        price,
        desc,
        coords,
      );

      res.status(200).json({ success: true, newelEment });
    });
  } catch (error) {
    console.error('Error handling form data:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export const getByCoords: ControllerAction = async (req, res) => {
  const { coords } = req.params;
  const advertisement = await advertisementService.getByCoords(coords);

  if (!advertisement) {
    res.sendStatus(404);
    return;
  }

  res.send([advertisement]);
};

export const getAll: ControllerAction = async (req, res) => {
  const advertisement = await advertisementService.getAll();

  if (!advertisement) {
    res.sendStatus(404);
    return;
  }

  res.send(advertisement);
};
