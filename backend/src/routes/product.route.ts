import express from "express";
import { getProductList, addProduct, getProductById, editProduct, deleteProductById } from "../controllers/productController"

const router = express.Router();

router.get('/', getProductList);
router.post('/', addProduct);
router.get('/:productId', getProductById);
router.put('/:productId', editProduct);
router.delete('/:productId', deleteProductById);

export default router;