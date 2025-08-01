import express from 'express';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';
import {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.get('/all', protect, isAdmin, getAllUsers);
router.delete('/:id', protect, isAdmin, deleteUser);

export default router;
