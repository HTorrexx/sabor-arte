import { Router } from "express";
import {
  getProducts,
  createProducts,
  updateProduct,
  deleteProducts,
  getProduct,
} from "../controllers/products.controller.js";
import { verifyToken, isAdmin } from "../middlewares/authjwt.js";
const router = Router();

/* Products Routes */

router.get("/products", getProducts);

router.get("/products/:id", getProduct);

router.post("/products",  [verifyToken, isAdmin],  createProducts);

router.put("/products/:id", [verifyToken, isAdmin], updateProduct);

router.delete("/products/:id", [verifyToken, isAdmin], deleteProducts);

export default router;
