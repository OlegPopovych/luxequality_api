'use strict';

import { Router } from 'express';
import * as advertisementController from '../controllers/advertisement.controller';
import asyncHandler from 'express-async-handler';

export const advertisementRouter = Router();

advertisementRouter.post('/', asyncHandler(advertisementController.create));
advertisementRouter.get('/geById/:coords', asyncHandler(advertisementController.getByCoords));
advertisementRouter.get('/all', asyncHandler(advertisementController.getAll));
