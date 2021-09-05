import axios from 'axios';
import {IUser} from "../types/types";

export const API_URL = `http://localhost:5000/api`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})
$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config;
})
export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export interface AuthResponse{
    message?:string
    errors?: any[]
    accessToken?: string
    user?:IUser
    resultCode: number
}
export interface AuthMeResponse{
    message?:string
    errors?: any[]
    accessToken?: string
    user:IUser
    resultCode: Number
}

export default $api;