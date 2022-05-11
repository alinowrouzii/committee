import config from './config/index'
import { Request, Response } from "express";
import app from "./app"
import payRouter from "./routes/payment"
import receiptRouter from "./routes/receipts"
import connectDB from "./db/index"
import { FinnotechServices } from './services/fnServices';
const runAPI = async () => {

  await connectDB()

  app.get("/ping", (req: Request, res: Response)=>{
    return res.status(200).json("PONG!");
  });

  app.use("/payment", payRouter);
  app.use("/receipt", receiptRouter);

  return app;

  
}
app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello from the TypeScript world!</h1>");
});


runAPI().then(app => {
  FinnotechServices.getShebaNumber("6037997283647056").then(()=>{
    app.listen(config.PORT, ( ) => console.log(`Running on ${config.PORT} ⚡`));
  })
}).catch(err => {
  console.log(err)
})
