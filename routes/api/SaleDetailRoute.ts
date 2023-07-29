import { Router } from "express";
import { SaleDetailController } from "../../app/Http/Controllers/SaleDetailController";

const obj = new SaleDetailController();
const router = Router();

router.get("/sale_details", obj.getSaleDetails);
router.get("/sale_detail/:id", obj.getSaleDetail);
router.post("/sale_detail", obj.storeSaleDetail);
router.put("/sale_detail/:id", obj.updateSaleDetail);
router.delete("/sale_detail/:id", obj.deleteSaleDetail);

export default router;
