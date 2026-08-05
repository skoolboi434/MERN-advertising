import express from 'express';
const router = express.Router();
import { getAccountTypes, createAccountType, importAccountTypes, deleteAccountType, updateAccountType, getUserRoles, createUserRole } from '../controllers/admin/accountsController.js';
import { getProducts } from '../controllers/admin/classifiedsController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/accounts').get(protect, getAccountTypes).post(protect, createAccountType);

router.route('/accounts/:id').put(protect, updateAccountType).delete(protect, deleteAccountType);

router.route('/classifieds').get(protect, getProducts);

router.route('/accounts/import').post(protect, importAccountTypes);

router.route('/roles').get(protect, getUserRoles).post(protect, createUserRole);

export default router;
