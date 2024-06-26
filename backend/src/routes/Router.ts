import { Router } from "express";
import customerRouter from "./customer.route";
import adminRouter from "./admin.route";
import supplierRouter from "./supplier.route";
import categoryRouter from "./category.route";
import productRouter from "./product.route";
import orderRouter from "./order.route"
import voucherRouter from "./voucher.router"
import cartRouter from "./cart.route"
import fileRouter from "./file.route"
import reportRouter from "./report.route"
const router = Router();

router.use("/customers", customerRouter)
router.use("/admin", adminRouter)
router.use("/supplier", supplierRouter)
router.use("/category", categoryRouter)
router.use("/product", productRouter)
router.use("/order", orderRouter)
router.use("/voucher", voucherRouter)
router.use("/cart", cartRouter)
router.use("/file", fileRouter)
router.use("/report", reportRouter)

export default router;