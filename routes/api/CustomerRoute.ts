import { Router } from "express";
import { CustomerController } from "../../app/Http/Controllers/CustomerController";

const obj = new CustomerController();
const router = Router();

router.get("/customers", obj.getCustomers);
router.get("/customer/:id", obj.getCustomer);
router.post("/customer", obj.storeCustomer);
router.put("/customer/:id", obj.updateCustomer);
router.delete("/customer/:id", obj.deleteCustomer);

export default router;
