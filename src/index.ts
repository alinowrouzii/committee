import config from './config/index'
import { Request, Response } from "express";
import app from "./app"
import payRouter from "./routes/payment"
import connectDB from "./db/index"
// import axios from 'axios';
import {generate_initial_token} from './services/tokens'
import axios from 'axios';

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
  generate_initial_token().then(()=> {
    app.listen(config.PORT, () => console.log(`Running on ${config.PORT} ⚡`));
  })
}).catch(err => {
  console.log(err)
})

var data = JSON.stringify({
  "grant_type": "client_credentials",
  "nid": "6780026883",
  "scopes": "facility:card-to-iban:get"
});

// var config = {
//   method: 'post',
//   url: 'https://apibeta.finnotech.ir/dev/v2/oauth2/token',
//   headers: { 
//     'Authorization': 'Basic YWxpbm93OnI2ZmJCV2pISTltR2tiWDNIV0dw', 
//     'Content-Type': 'application/json', 
//   },
//   data : data
// };

// axios(config)
// .then(function (response) {
//   console.log("ressssss",JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log("11111",error.response.data);
// });
// try{
// const result = axios.post('https://apibeta.finnotech.ir/dev/v2/oauth2/token', {
//         headers: { 
//                 'Authorization': 'Basic YWxpbm93OnI2ZmJCV2pISTltR2tiWDNIV0dw', 
//                 'Content-Type': 'application/json', 
//               },
//               data : data  
//             }).then(function(res) {
//               console.log(">>>response", res);
              
//             }).catch(function (error) {
//                 console.log("11111",error.response.data)})
//         console.log(">>>>>>>>>>>>>>>>>>>>.", result);
        

//         } catch (error) {
//             console.log("errorr", error);
            
//             // throw error
//         }