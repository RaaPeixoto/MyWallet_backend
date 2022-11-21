import {transactionsSchema} from "./transactionSchema.js"
import { sessionsCollection } from "../database/db.js";
export async function postTransactionValidation(req,res,next){  

    const { authorization } = req.headers;
    
    const token = authorization?.replace("Bearer ", "");
    if (!token) {
      return res.sendStatus(401);
    }
    const {error}=transactionsSchema.validate(req.body,{abortEarly:false});

    if(error){
      const errors = error.details.map((detail)=>detail.message);
      return res.status(422).send(errors);
    }

    const session = await sessionsCollection.findOne({ token });
    if (!session) {
      return res.sendStatus(401);
    }

    req.session= session;


  
    next();
}