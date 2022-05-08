import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";



const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


export default app