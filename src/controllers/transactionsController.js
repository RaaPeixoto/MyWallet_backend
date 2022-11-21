import { transactionsCollection, sessionsCollection } from "../database/db.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { transactionsSchema } from "../middlewares/transactionSchema.js";
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
  const session = req.session;
  const today = dayjs().format("DD/MM/YY");

  try {
    await transactionsCollection.insertOne({
      userId: session?.userId,
      description,
      transactionValue,
      date: today,
      type,
      time:Date.now()
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
      _id: new ObjectId(id),
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
  const { error } = transactionsSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }
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
