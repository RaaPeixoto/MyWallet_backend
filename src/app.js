import express from "express";
import cors from "cors";
import joi from "joi";
import usersRouters from "./routers/usersRouters.js"
import transactionsRouters from "./routers/transactionsRouters.js"
const app = express();

app.use(cors());
app.use(express.json());
app.use(usersRouters);
app.use(transactionsRouters);

export const newUserSchema = joi.object({
name:joi.string().required().min(3),
email:joi.string().required(),
password:joi.string().required()
});

const port = 5000;
app.listen(port,()=> console.log `server running in port: ${port}`)