import axios from "axios";
import config from "../config/index";
import Token from "../models/Token";
import { client } from "./../config/axios";
const { user_private_token } = config;

const generate_initial_token = async () => {

    const headers = {
        Authorization: `Basic ${user_private_token}`,
        "Content-Type": "application/json",
    };
    console.log(headers);

    var data = JSON.stringify({
        grant_type: "client_credentials",
        nid: `${config.nid}`,
        scopes: `${config.scopes}`,
    });

    const result = await axios.post(
        "https://apibeta.finnotech.ir/dev/v2/oauth2/token", data, {
        headers: headers,
    }
    );

    console.log("res", result.data);
    const token = new Token({
        token: result.data.result.value,
        refresh_token: result.data.result.refreshToken
    });

    await token.save();
};

const generate_new_token = async function () {
    const tokens = await Token.find();
    // if (tokens.length === 0) {
    //     console.log("here");
    //     await generate_initial_token();
    //     return 
    // }
    const token = tokens[0];
    console.log(token)
    console.log("===========")
    const refresh_token = token.refresh_token

    const headers = {
        Authorization: `Basic ${user_private_token}`,
        "Content-Type": "application/json",
    };
    console.log(headers);

    var data = JSON.stringify({
        grant_type: "refresh_token",
        refresh_token: refresh_token,
        token_type: "CLIENT-CREDENTIAL",
    });

    const result = await axios.post(
        "https://apibeta.finnotech.ir/dev/v2/oauth2/token", data, {
        headers: headers,
    }
    );

    token.refesh_token = result.data.result.refreshToken
    token.token = result.data.result.value

    await token.save();
    console.log(token)
};

export { generate_new_token, generate_initial_token };
