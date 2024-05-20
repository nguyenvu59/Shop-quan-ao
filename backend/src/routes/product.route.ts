import express from "express";
import { getTop10Product,getProductList, addProduct, getProductById, editProduct, deleteProductById } from "../controllers/productController"

const router = express.Router();

router.get('/top10/', getTop10Product);
router.get('/', getProductList);
router.post('/', addProduct);
router.get('/:productId', getProductById);
router.put('/:productId', editProduct);
router.delete('/:productId', deleteProductById);

export default router;