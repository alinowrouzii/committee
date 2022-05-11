import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";
import TokenService from "../services/tokens";
import { v4 as uuidv4 } from "uuid";

class AxiosClient {
    axiosInstance: AxiosInstance;

    constructor(config: any) {
        this.axiosInstance = axios.create(config);
        this.axiosInstance.interceptors.request.use(
            AxiosClient.onRequest,
            AxiosClient.onRequestError
        );
        this.axiosInstance.interceptors.response.use(
            AxiosClient.onResponse,
            AxiosClient.onResponseError
        );
    }

    private static async onRequest(
        config: AxiosRequestConfig
    ): Promise<AxiosRequestConfig> {
        // console.info(`[request] [${JSON.stringify(config)}]`);
        // console.log(config)

        const token = await TokenService.get_ac_token();
        if (config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    }

    private static onRequestError(error: AxiosError): Promise<AxiosError> {
        console.error(`[request error] [${error}]`);
        console.log(error.message);
        return Promise.reject(error);
    }

    private static onResponse(response: AxiosResponse): AxiosResponse {
        console.info(`[response] [${response}]`);
        return response;
    }

    // NOTE: by default async function returns promise
    private static async onResponseError(
        error: AxiosError
    ): Promise<AxiosError> {
        console.error(`[response error] [${error}]`);

        if (error.response?.status !== 401 && error.response?.status !== 403) {
            return Promise.reject(error);
        }

        const new_token = await TokenService.generate_new_ac_token();

        if (error.config.headers) {
            // TODO remove after test
            console.log("im in ac_axios interseptor and setting new token...");
            await new Promise((r) => setTimeout(r, 2000));
            error.config.headers["Authorization"] = "Bearer " + new_token;
        }

        const url = `${error.config.url}`;
        const new_url = new URL(url);
        new_url.searchParams.set("trackId", uuidv4());
        error.config.url = new_url.toString();

        error.config.baseURL = undefined;
        return axios.request(error.config);
    }
}

export default AxiosClient;
