import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  deleteProduct,
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").post(protect, createProductReview);
router.route("/top").get(getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
export default router;
