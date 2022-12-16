import {Router} from "express";
import {addOrderItem} from "../controllers/orderController.js";
import {auth} from "../middleware/auth.js";

const router = Router()

router.post('/', auth, addOrderItem)

export default router
