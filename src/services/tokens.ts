import axios from "axios";
import config from "../config/index";
import Token from "../models/Token";
const { user_private_token } = config;
import { client } from "./../config/axios";

const generate_initial_token = async () => {
    console.log("shit3");

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

    const result = await client({}).post(
        "https://apibeta.finnotech.ir/dev/v2/oauth2/token", data, {
        headers: headers,
    }
    );

    console.log("res", result.data);

};

const generate_new_token = async function () {
    const token = await Token.find();
    if (token.length === 0) {
        console.log("here");
        return generate_initial_token();
    }
    const refresh_token = token[0].refresh_token;
};

export { generate_new_token, generate_initial_token };
