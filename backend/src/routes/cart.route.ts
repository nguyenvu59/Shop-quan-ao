import express from "express";
import { addToCart, changeQuantityInCart, findOrCreateCart, removeFromCart, } from "../controllers/cartController"

const router = express.Router();

router.get('/:customerId', findOrCreateCart);
router.post('/', addToCart);
router.put('/update-quantity', changeQuantityInCart);
router.delete('/:cartItemId', removeFromCart);

export default router;