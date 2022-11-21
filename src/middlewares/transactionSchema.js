import joi from "joi";



export const transactionsSchema = joi.object({
    description:joi.string().required().min(3).max(30),
    transactionValue:joi.string().required(),
    type:joi.string().required().valid('deposit', 'withdraw'),
    });