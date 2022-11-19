import { transactionsCollection, sessionsCollection } from "../database/db.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";
export async function getTransactions(req, res) {
  //"a4f79fd4-7786-40ed-a778-0ca544efc613"
  const { authorization } = req.headers;
  // validar
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const sessions = await sessionsCollection.findOne({ token });
    console.log(sessions);
    const userTransactions = await transactionsCollection
      .find({
        userId: sessions?.userId,
      })
      .toArray();

    res.send(userTransactions);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function postTransaction(req, res) {
  //"a4f79fd4-7786-40ed-a778-0ca544efc613"
  //{"value":22,"description":"teste","type":"deposit"}
  const { value, description, type } = req.body;
  // validar
  const { authorization } = req.headers;
  const today = dayjs().format("DD/MM/YY");
  console.log(today);
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const session = await sessionsCollection.findOne({ token });
    if (!session) {
      return res.sendStatus(401);
    }
    console.log(session);
    await transactionsCollection.insertOne({
      userId: session?.userId,
      description,
      value,
      date: today,
      type,
    });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function deleteTransaction(req, res) {
  const { authorization } = req.headers;
  const { id } = req.params;
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

  console.log(session.userId);
  if (existingTransaction.userId.toString() !== session.userId.toString()) {
    return res.sendStatus(401);
  }
  try {
    await transactionsCollection.deleteOne({
      _id: existingTransaction._id,
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function updateTransaction(req, res) {
  const { description, value } = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const { id } = req.params;
  if (!token) {
    return res.sendStatus(401);
  }
  const session = await sessionsCollection.findOne({ token });
  if (!session) {
    return res.sendStatus(401);
  }

  if (!session) {
    return res.sendStatus(401);
  }
  const existingTransaction = await transactionsCollection.findOne({
    _id: new ObjectId(id),
  });
  if (!existingTransaction) {
   
    return res.sendStatus(404);
  }
  if (existingTransaction.userId.toString() !== session.userId.toString()) {
    return res.sendStatus(401);
  }

  try {
    await transactionsCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: { value, description },
      }
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
