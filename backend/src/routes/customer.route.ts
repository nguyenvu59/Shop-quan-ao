import express from "express";
import { login,list,create,detail, update, deleteById } from "../controllers/customerController"

const router = express.Router();

router.get('/', list);
router.post('/', create);
router.post('/login', login);
router.get('/:id', detail);
router.put('/:id', update);
router.delete('/:id', deleteById);

export default router;