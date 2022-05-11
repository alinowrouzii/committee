import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";
import TokenService from "../services/tokens";

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
        const token = await TokenService.get_token();
        if (config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        console.log(config);
        return config;
    }

    private static onRequestError(error: AxiosError): Promise<AxiosError> {
        // console.error(`[request error] [${error}]`);
        // console.log(error.message)
        return Promise.reject(error);
    }

    private static onResponse(response: AxiosResponse): AxiosResponse {
        // console.info(`[response] [${response}]`);
        return response;
    }

    // NOTE: by default async function returns promise
    private static async onResponseError(
        error: AxiosError
    ): Promise<AxiosError> {
        // console.error(`[response error] [${error}]`);

        if (error.response?.status !== 401 && error.response?.status !== 403) {
            return Promise.reject(error);
        }

        console.log("im going to generate new token");
        const new_token = await TokenService.generate_new_token();

        if (error.config.headers) {
            error.config.headers["Authorization"] = "Bearer " + new_token;
            console.log("token was not valid. setting new token...");
            await new Promise((r) => setTimeout(r, 10000));
        }
        error.config.baseURL = undefined;
        return axios.request(error.config);
    }
}

export default AxiosClient;
