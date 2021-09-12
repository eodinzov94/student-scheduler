import axios from 'axios';
import {ICourse, IUser} from "../types/types";

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
export interface Response{
    message?:string
    errors?: any[]
    resultCode: number
}
export interface AuthResponse extends Response{
    accessToken?: string
}
export interface AuthMeResponse extends AuthResponse{
    user:IUser
}
export interface CoursesResponse extends Response{
    courses:ICourse[]
}
export interface CourseResponse extends Response{
    course:ICourse
}
export default $api;