import express from "express";
import cors from "cors";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4  as uuidV4} from "uuid";
import usersRouters from "./routers/usersRouters.js"
const app = express();

app.use(cors());
app.use(express.json());
app.use(usersRouters);

export const newUserSchema = joi.object({
name:joi.string().required().min(3),
email:joi.string().required(),
password:joi.string().required()
});

const port = 5000;
app.listen(port,()=> console.log `server running in port: ${port}`)