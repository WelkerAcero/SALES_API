import { Router } from "express";
import { ProductController } from "../../app/Http/Controllers/ProductController";

const obj = new ProductController();
const router = Router();

router.get("/products", obj.getProducts);
router.get("/product/:id", obj.getProduct);
router.post("/product", obj.storeProduct);
router.put("/product/:id", obj.updateProduct);
router.delete("/product/:id", obj.deleteProduct);

export default router;
