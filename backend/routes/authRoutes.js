import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
/*
api/auth/register
{
  "name": "Shubham Verma",
  "email": "aaa@gmail.com",
  "password": "yourSecurePassword123",
  "role": "restaurant" // or "ngo" depending on the signup type
}
 */