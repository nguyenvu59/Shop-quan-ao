import { Router } from "express";
import customerRouter from "./customer.route";

const router = Router();

router.use("/customers", customerRouter)

export default router;