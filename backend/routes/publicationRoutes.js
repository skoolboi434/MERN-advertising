import express from 'express';
const router = express.Router();
import { getPublications, getPublicationById, createPublication, updatePublication, createPublicationNote } from '../controllers/publicationController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(getPublications).post(protect, createPublication);

router.route('/:id').get(getPublicationById).put(protect, updatePublication);

router.route('/:id/notes').post(protect, createPublicationNote);

export default router;
