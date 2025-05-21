// routes/foodRoutes.js
import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  donateFood,
  getAvailableFoods,
  getFoodById,
  reserveFood,
  getDonatedFoods,
  getReceivedFoods
} from '../controllers/foodController.js';

const router = express.Router();

router.route('/donate')
  .post(protect, donateFood)
  .get(getAvailableFoods);

router.get('/test', (req, res) => {
  res.json({ message: '✅ Food route is working!' });
});
  

router.route('/donated').get(protect, getDonatedFoods);
router.route('/received').get(protect, getReceivedFoods);
router.route('/:id').get(getFoodById);
router.route('/:id/reserve').put(protect, reserveFood);

export default router;
