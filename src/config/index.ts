import dotenv from "dotenv"
dotenv.config()


const config : {
    mongoURL: string,
    PORT: string,
    user_private_token: String,
    user_ac_code: String,
    DEBUG: boolean,
    nid: string,
    scopes: string,
    dst_card: string,
} = {
    mongoURL: process.env.mongoURL || "mongodb://localhost:27017/DevDB",
    PORT: process.env.PORT || "3000",
    user_private_token: `${process.env.user_private_token}`,
    DEBUG: process.env.NODE_ENV === "development",
    nid: `${process.env.nid}`,
    scopes: `${process.env.scopes}`,
    user_ac_code: `${process.env.user_ac_code}`,
    dst_card: `${process.env.dst_card}`
}



export default config