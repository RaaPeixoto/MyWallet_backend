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
  const { transactionValue, description, type } = req.body;
  // validar
  const { authorization } = req.headers;
  const today = dayjs().format("DD/MM/YY");
  
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const session = await sessionsCollection.findOne({ token });
    if (!session) {
      return res.sendStatus(401);
    }
   
    await transactionsCollection.insertOne({
      userId: session?.userId,
      description,
      transactionValue,
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
  const { id } = req.params;

  try {
    await transactionsCollection.deleteOne({
      _id:  new ObjectId(id),
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function updateTransaction(req, res) {
  const { description, transactionValue } = req.body;
  const { id } = req.params;
  console.log(id)
  try {
    await transactionsCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: { transactionValue, description },
      }
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
