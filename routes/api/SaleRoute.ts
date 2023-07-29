import { Router } from "express";
import { SaleController } from "../../app/Http/Controllers/SaleController";

const obj = new SaleController();
const router = Router();

router.get("/sales", obj.getSales);
router.get("/sale/:id", obj.getSale);
router.get("/sale/:date", obj.getSaleByDate);
router.post("/sale", obj.storeSale);
router.put("/sale/:id", obj.updateSale);
router.delete("/sale/:id", obj.deleteSale);

export default router;
