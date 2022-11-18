import { usersCollection,sessionsCollection} from "../database/db.js";
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

export async function signUp(req,res) {
// formato = {"name":"fulano", "email":"fulano@oi.com","password":"12345","passwordConfirmation":"12345"}
//fazer validações joi: todos requiridos, se as senhas são iguais, nome mais 3 caracteres, se é email
const user = req.user;
//verificar se existe email cadastrado
const passwordHash = bcrypt.hashSync(user.password, 10);
try{
    await usersCollection.insertOne({...user,password:passwordHash});
    res.sendStatus(200)
}catch (err){
    console.log(err);
    res.sendStatus(500)
}
}


