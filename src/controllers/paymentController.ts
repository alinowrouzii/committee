import { Request, Response } from "express";
import { withdraw } from "../services/payment";
import config from '../config/index';

const pay = async (req: Request, res: Response) => {
    console.log('im in pay')


    const pay_result = await withdraw(config.dst_card, "6362141130272843" )
    return res.status(200).json({result: pay_result})
}

export { pay }