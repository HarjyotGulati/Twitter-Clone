import express from 'express';
import { signUp,login,logOut,getAllUsers,getMe } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router =express.Router();

router.get('/getallusers',getAllUsers);
router.get('/me',protectRoute,getMe)
router.post('/signup',signUp);
router.post('/login',login);
router.get('/logout',logOut);


export default router;