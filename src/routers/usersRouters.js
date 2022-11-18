import { signIn, signUp } from "../controllers/usersController.js";
import { Router } from "express";
import { newUserValidation } from "../middlewares/newUserMiddleware.js";
import { deleteTransaction, getTransactions, postTransaction } from "../controllers/transactionsController.js";

const router =Router();

router.post("/signUp",newUserValidation,signUp);
router.post("/signIn",signIn);
router.post("/transactions",postTransaction);
router.get("/transactions",getTransactions);
router.delete("/transactions/:id",deleteTransaction);

export default router;