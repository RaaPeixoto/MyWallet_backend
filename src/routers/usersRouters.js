import { signIn, signUp } from "../controllers/usersController.js";
import { Router } from "express";
import { newUserValidation } from "../middlewares/newUserMiddleware.js";

const router =Router();

router.post("/signUp",newUserValidation,signUp);
router.post("/signin",signIn);



export default router;