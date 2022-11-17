import express from "express";
import { MongoClient,ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4  as uuidV4} from "uuid";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

try{
    await mongoClient.connect();
}catch(err){
    console.log(err.message);
}

db = mongoClient.db("myWallet");
const auth = db.collection("auth");
const sessions = db.collection("sessions");
const extract = db.collection("extract");


const port = 5000;
app.listen(port,()=> console.log `server running in port: ${port}`)