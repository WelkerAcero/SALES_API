import { Router } from "express";
import { BranchOfficeController } from "../../app/Http/Controllers/BranchOfficeController";

const obj = new BranchOfficeController();
const router = Router();

router.get("/branch_offices", obj.getBranchOffices);
router.get("/branch_office/:id", obj.getBranchOffice);
router.post("/branch_office", obj.storeBranchOffice);
router.put("/branch_office/:id", obj.updateBranchOffice);
router.delete("/branch_office/:id", obj.deleteBranchOffice);

export default router;
