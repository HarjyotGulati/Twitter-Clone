import express from 'express';
import {getUserProfile,followUnfollowUser,getSuggestedUsers,updateUser} from '../controllers/user.controller.js';
import { protectRoute} from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/profile/:userName",protectRoute,getUserProfile);
router.get("/suggestedUser",protectRoute,getSuggestedUsers);
router.post("/follow/:id",protectRoute,followUnfollowUser);
router.post("/update",protectRoute,updateUser);

export default router;