import dotenv from "dotenv"
dotenv.config()


const config : {
    mongoURL: string,
    PORT: string,
} = {
    mongoURL: process.env.mongoURL || "mongodb://localhost:27017/DevDB",
    PORT: process.env.PORT || "3000"
}



export default config