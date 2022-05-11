import axios from "axios";
import config from "../config/index";
import Token from "../models/Token";
import ACToken from "../models/ACToken";
const { user_ac_code, user_private_token } = config;

class TokenService {
    constructor() {}

    static async generate_initial_token() {
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
            "https://apibeta.finnotech.ir/dev/v2/oauth2/token",
            data,
            {
                headers: headers,
            }
        );

        console.log("res", result.data);
        const token = new Token({
            token: result.data.result.value,
            refresh_token: result.data.result.refreshToken,
        });

        await token.save();

        return token.token;
    }

    static async generate_new_token() {
        const tokens = await Token.find();
        if (tokens.length === 0) {
            console.log("here");
            return TokenService.generate_initial_token();
        }
        const token = tokens[0];
        console.log("===========");
        const refresh_token = token.refresh_token;

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
            "https://apibeta.finnotech.ir/dev/v2/oauth2/token",
            data,
            {
                headers: headers,
            }
        );

        token.refesh_token = result.data.result.refreshToken;
        token.token = result.data.result.value;

        await token.save();
        // console.log(token);
        return token.token;
    }

    static async get_token() {
        const tokens = await Token.find();

        if (tokens.length === 0) {
            return TokenService.generate_initial_token();
        }

        return tokens[0].token;
    }



    // ac token
    
static async generate_initial_ac_token() {

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

static async generate_new_ac_token() {
    const tokens = await ACToken.find();
    if (tokens.length === 0) {
        console.log("initial called here");
        return TokenService.generate_initial_ac_token();
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


    return token.token
};


static async get_ac_token() {
    const tokens = await ACToken.find()

    if (tokens.length === 0){
        return TokenService.generate_initial_ac_token();
    }

    return tokens[0].token
}

}

export default TokenService;
