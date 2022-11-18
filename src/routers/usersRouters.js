import { signUp } from "../controllers/usersController.js";
import { Router } from "express";
import { newUserValidation } from "../middlewares/newUserMiddleware.js";

const router =Router();

router.post("/signUp",newUserValidation,signUp);

export default router;