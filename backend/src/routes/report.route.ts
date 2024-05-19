import express from "express";
import { getOrdersByDate, getProductsSoldAllTime, getTotalRevenueByDate} from "../controllers/reportController"

const router = express.Router();

router.get('/orderbydate/', getOrdersByDate);
router.get('/productbydate', getProductsSoldAllTime);
router.get('/totalbydate', getTotalRevenueByDate);

export default router;