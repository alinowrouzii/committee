import { Request, Response } from "express";
import FinnotechServices from "../services/fnServices";
import config from '../config/index';
import Receipt from "../models/Receipt";

const pay = async (req: Request, res: Response) => {
    const pay_result = await FinnotechServices.withdraw(config.dst_card, "6362141130272843" )

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