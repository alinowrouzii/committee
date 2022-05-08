import dotenv from "dotenv"
dotenv.config()


const config : {
    mongoURL: string,
    PORT: string,
    user_private_token: String,
    DEBUG: boolean,
    nid: string,
    scopes: string,
} = {
    mongoURL: process.env.mongoURL || "mongodb://localhost:27017/DevDB",
    PORT: process.env.PORT || "3000",
    user_private_token: `${process.env.user_private_token}`,
    DEBUG: process.env.NODE_ENV === "development",
    nid: `${process.env.nid}`,
    scopes: `${process.env.scopes}`,
}



export default config