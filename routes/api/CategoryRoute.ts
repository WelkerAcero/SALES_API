import { Router } from "express";
import { CategoryController } from "../../app/Http/Controllers/CategoryController";

const obj = new CategoryController();
const router = Router();

router.get("/categories", obj.getCategories);
router.get("/category/:id", obj.getCategory);
router.post("/category", obj.storeCategory);
router.put("/category/:id", obj.updateCategory);
router.delete("/category/:id", obj.deleteCategory);

export default router;
