import { Router } from "express";
import { SellerController } from "../../app/Http/Controllers/SellerController";

const obj = new SellerController();
const router = Router();

router.get("/sellers", obj.getSellers);
router.get("/seller/:id", obj.getSeller);
router.post("/seller", obj.storeSeller);
router.put("/seller/:id", obj.updateSeller);
router.delete("/seller/:id", obj.deleteSeller);

export default router;
