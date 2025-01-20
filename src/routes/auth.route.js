import {
  signup,
  login,
  logout,
  updateProfile,
  check,
} from '../controllers/auth.controller.js';
import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';

import multer from 'multer';
// Setup multer to handle file upload
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.put(
  '/update-profile',
  protectRoute,
  upload.single('profilePic'),
  updateProfile
);

router.get('/check', protectRoute, check);

export default router;
