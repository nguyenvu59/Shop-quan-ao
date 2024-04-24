import { Router } from "express";
import customerRouter from "./customer.route";
import adminRouter from "./admin.route";
import supplierRouter from "./supplier.route";
import categoryRouter from "./category.route";
import productRouter from "./product.route";
import orderRouter from "./order.route"
import voucherRouter from "./voucher.router"

const router = Router();

router.use("/customers", customerRouter)
router.use("/admin", adminRouter)
router.use("/supplier", supplierRouter)
router.use("/category", categoryRouter)
router.use("/product", productRouter)
router.use("/order", orderRouter)
router.use("/voucher", voucherRouter)

export default router;