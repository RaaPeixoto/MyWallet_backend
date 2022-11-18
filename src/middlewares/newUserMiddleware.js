import { usersCollection } from "../database/db.js";
import { newUserSchema } from "../app.js";
export async function newUserValidation(req, res, next) {
  const { name, email, password, passwordConfirmation } = req.body;
  const isUserRegistered = await usersCollection.findOne({ email });
  if (isUserRegistered) {
    return res.status(409).send("Usuário já cadastrado");
  }
  if (password !== passwordConfirmation) {
    return res
      .status(400)
      .send("Senha de confirmação diferente de senha cadastrada");
  }

  const user = {
    name,
    email,
    password,
  };

  const {error}=newUserSchema.validate(user,{abortEarly:false});

  if(error){
    const errors = error.details.map((detail)=>detail.message);
    return res.status(422).send(errors);
  }

  req.user= user;

  next();
}
