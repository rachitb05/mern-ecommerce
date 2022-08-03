import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  authUser,
  getUserProfile,
  getUsers,
  registerUser,
  updateUserProfile,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/login").post(authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);
export default router;
