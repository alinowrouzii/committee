
import express, { Express } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";

const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


export default app