import express from "express";
import { list_by_customer_id,list,create,detail, update, deleteById } from "../controllers/orderController"

const router = express.Router();

router.get('/', list);
router.get('/:customer_id', list_by_customer_id);
router.post('/', create);
router.get('/:id', detail);
router.put('/:id', update);
router.delete('/:id', deleteById);

export default router;