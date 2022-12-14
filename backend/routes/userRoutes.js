import {Router} from "express";
import {authUser, profileUser, registerUser} from "../controllers/userController.js";
import {auth} from "../middleware/auth.js";

const router = Router()

router.post('/login', authUser)
router.post('/register', registerUser)
router.get('/profile', auth, profileUser)


export default router
