import { Request, Response } from "express";
import { withdraw } from "../services/payment";
import config from '../config/index';
import Receipt from "../models/Receipt";

const pay = async (req: Request, res: Response) => {
    const pay_result = await withdraw(config.dst_card, "6362141130272843" )

    const receipt = await Receipt.create({
        amount: pay_result.amount,
        description: pay_result.description,
        destinationFirstname: pay_result.destinationFirstname,
        destinationLastname: pay_result.destinationLastname,
        sourceFirstname: pay_result.sourceFirstname,
        sourceLastname: pay_result.sourceLastname,
        refCode: pay_result.refCode,
    });

    return res.status(200).json({result: receipt})
}

export { pay }