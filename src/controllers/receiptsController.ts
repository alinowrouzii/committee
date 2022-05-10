import { Request, Response } from "express"
import Receipt from "../models/Receipt";

const get_receipt_by_id = async(req: Request, res: Response)=>{
    const ref_id = req.params.ref_id;

    const receipt = await Receipt.findOne({refCode: ref_id})

    return res.status(200).json({"receipt": receipt});
}


export {get_receipt_by_id}