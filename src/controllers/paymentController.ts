import express, { Express, Request, Response } from "express";


const pay = async (req: Request, res: Response) => {


    console.log('im in pay')

    return res.status(200).json('im in pay')
}

export { pay }