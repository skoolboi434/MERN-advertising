import express from 'express';
const router = express.Router();
import { getAccountTypes, createAccountType } from '../controllers/admin/accountsController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/accounts').get(protect, getAccountTypes).post(protect, createAccountType);

export default router;
