import express from 'express';
const router = express.Router();
import { getAccountTypes, createAccountType, importAccountTypes, deleteAccountType, updateAccountType } from '../controllers/admin/accountsController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/accounts').get(protect, getAccountTypes).post(protect, createAccountType);

router.route('/accounts/:id').put(protect, updateAccountType).delete(protect, deleteAccountType);

router.route('/accounts/import').post(protect, importAccountTypes);

export default router;
