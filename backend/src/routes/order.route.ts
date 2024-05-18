import express from "express";
import { createPaymentUrl,list_by_customer_id, list, create, detail, update, deleteById } from "../controllers/orderController"

const router = express.Router();

router.get('/createPMURL', createPaymentUrl);
router.get('/list/', list);
router.get('/customer/:customer_id', list_by_customer_id);
router.post('/', create);
router.get('/:id', detail);
router.put('/:id', update);
router.delete('/:id', deleteById);

export default router;