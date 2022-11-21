
import { editTransactionValidation } from "../middlewares/editTransactionMiddleware.js";
import { Router } from "express";
import { deleteTransaction, getTransactions, postTransaction, updateTransaction } from "../controllers/transactionsController.js";
import { postTransactionValidation } from "../middlewares/postTransactionMiddleware.js";

const router =Router();
router.post("/transactions",postTransactionValidation,postTransaction);
router.get("/transactions",getTransactions);
/* router.use(editTransactionValidation); */
router.delete("/transactions/:id",editTransactionValidation,deleteTransaction);
router.put("/transactions/:id",editTransactionValidation,updateTransaction);

export default router;