import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import { auth } from '../middleware/auth.js';
import { validateProfileUpdate } from '../middleware/validate.js';

const router = express.Router();

router.get('/me', auth, getProfile);
router.put('/me', auth, validateProfileUpdate, updateProfile);

export default router;