import express from 'express';
const router = express.Router();
import { getAdvertisers, getSingleAdvertiser, createAdvertiser } from '../controllers/advertisersController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(getAdvertisers).post(protect, createAdvertiser);

router.route('/:id').get(getSingleAdvertiser).post(protect, createAdvertiser);

export default router;
