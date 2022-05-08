import config from './config/index'
import express, { Express, Request, Response } from "express";
import app from "./app"
import payRouter from "./routes/payment"
import connectDB from "./db/index"



const runAPI = async () => {

  await connectDB()

  app.get("/ping", (req: Request, res: Response)=>{
    return res.status(200).json("PONG!");
  });

  app.use("/payment", payRouter);

  return app;

  
}
app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello from the TypeScript world!</h1>");
});


runAPI().then(app => {
  app.listen(config.PORT, () => console.log(`Running on ${config.PORT} ⚡`));
}).catch(err => {
  console.log(err)
})
