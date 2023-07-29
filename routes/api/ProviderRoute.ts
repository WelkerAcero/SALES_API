import { Router } from "express";
import { ProviderController } from "../../app/Http/Controllers/ProviderController";

const obj = new ProviderController();
const router = Router();

router.get("/providers", obj.getProviders);
router.get("/provider/:id", obj.getProvider);
router.post("/provider", obj.storeProvider);
router.put("/provider/:id", obj.updateProvider);
router.delete("/provider/:id", obj.deleteProvider);

export default router;
