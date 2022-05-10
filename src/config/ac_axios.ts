import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {generate_new_ac_token, get_ac_token} from '../services/ac_tokens'

const onRequest = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    // console.info(`[request] [${JSON.stringify(config)}]`);
    // console.log(config)

    const token = await get_ac_token()
    if(config.headers){
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${error}]`);
    console.log(error.message)
    return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
    console.info(`[response] [${response}]`);
    return response;
}

// NOTE: by default async function returns promise
const onResponseError = async (error: AxiosError): Promise<AxiosError> => {

    console.error(`[response error] [${error}]`);
    

    if (error.response?.status !== 401 && error.response?.status !== 403){
        return Promise.reject(error);
    }

    const new_token = await generate_new_ac_token();

    if(error.config.headers){
        error.config.headers['Authorization'] = 'Bearer ' + new_token;
    }
    error.config.baseURL = undefined;
    return axios.request(error.config);
    
}

function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance   
}

const ac_client = (config: AxiosRequestConfig)=> {
    let instance: AxiosInstance = axios.create(config);
    instance = setupInterceptorsTo(instance)
    return instance
}

export { ac_client }
