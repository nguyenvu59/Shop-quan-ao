import express from "express";
import { getOrdersByDate, getProductsSoldByDate, getTotalRevenueByDate} from "../controllers/reportController"

const router = express.Router();

router.get('/orderbydate/', getOrdersByDate);
router.get('/productbydate', getProductsSoldByDate);
router.get('/totalbydate', getTotalRevenueByDate);

export default router;