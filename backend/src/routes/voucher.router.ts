import express from "express";
import { list,create,detail, update, deleteById } from "../controllers/voucherController"

const router = express.Router();

router.get('/', list);
router.post('/', create);
router.get('/:id', detail);
router.put('/:id', update);
router.delete('/:id', deleteById);

export default router;