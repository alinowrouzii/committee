import axios from "axios";
import config from "../config/index";
import ACToken from "../models/ACToken";
const { user_ac_code, user_private_token } = config;

const generate_initial_ac_token = async () => {

    const headers = {
        Authorization: `Basic ${user_private_token}`,
        "Content-Type": "application/json",
    };
    console.log(headers);

    var data = JSON.stringify({
        grant_type: "authorization_code",
        code: `${user_ac_code}`,
        bank: "062",
        redirect_uri:"https://google.com/return"
    });

    const result = await axios.post(
        "https://apibeta.finnotech.ir/dev/v2/oauth2/token", data, {
        headers: headers,
    }
    );

    console.log("res", result.data);
    const token = new ACToken({
        token: result.data.result.value,
        refresh_token: result.data.result.refreshToken
    });

    await token.save();


    return token.token
};

const generate_new_ac_token = async function () {
    const tokens = await ACToken.find();
    if (tokens.length === 0) {
        console.log("initial called here");
        return generate_initial_ac_token();
    }
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
        token_type: "CODE",
        bank:"062"
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


const get_ac_token = async()=>{
    const tokens = await ACToken.find()

    if (tokens.length === 0){
        return generate_initial_ac_token();
    }

    return tokens[0].token
}

export { generate_new_ac_token, generate_initial_ac_token, get_ac_token };