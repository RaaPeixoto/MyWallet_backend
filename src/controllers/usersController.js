import { usersCollection, sessionsCollection } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

export async function signUp(req, res) {
    // formato = {"name":"fulano", "email":"fulano@oi.com","password":"12345","passwordConfirmation":"12345"}
    const user = req.user;
    const passwordHash = bcrypt.hashSync(user.password, 10);
    try {
        await usersCollection.insertOne({ ...user, password: passwordHash });
        res.sendStatus(200)
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
export async function signIn(req, res) {
    const { email, password } = req.body;
    const token = uuidV4();
    const user = await usersCollection.findOne({ email });
    if (!user){
        return res.status(400).send("Email não cadastrado");
    }
    if (user && bcrypt.compareSync(password, user.password)) {
        await sessionsCollection.insertOne({
          token,
          userId: user._id,
        });
        return res.send({ token,userName:user.name });
      } else {
        res.sendStatus(401);
      };
}

