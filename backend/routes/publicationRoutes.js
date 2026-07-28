import express from 'express';
const router = express.Router();
import { getPublications, getPublicationById } from '../controllers/publicationController.js';

router.route('/').get(getPublications);

router.route('/:id').get(getPublicationById);

export default router;
