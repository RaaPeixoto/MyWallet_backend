
import { editTransactionValidation } from "../middlewares/editTransactionMiddleware.js";
import { Router } from "express";
import { deleteTransaction, getTransactions, postTransaction, updateTransaction } from "../controllers/transactionsController.js";

const router =Router();
router.post("/transactions",postTransaction);
router.get("/transactions",getTransactions);
/* router.use(editTransactionValidation); */
router.delete("/transactions/:id",editTransactionValidation,deleteTransaction);
router.put("/transactions/:id",editTransactionValidation,updateTransaction);

export default router;