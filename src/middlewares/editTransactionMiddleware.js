import { sessionsCollection, transactionsCollection } from "../database/db.js";
import { ObjectId } from "mongodb";

export async function editTransactionValidation(req, res, next) {
  const { id } = req.params;
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }
  const session = await sessionsCollection.findOne({ token });
  if (!session) {
    return res.sendStatus(401);
  }
  const existingTransaction = await transactionsCollection.findOne({
    _id: new ObjectId(id),
  });

  if (!existingTransaction) {
    return res.sendStatus(404);
  }

  next();
}
