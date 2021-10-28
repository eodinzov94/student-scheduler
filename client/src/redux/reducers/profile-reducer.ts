import {AppDispatch, BaseThunkType, InferActionsTypes} from "../Store";
import UserService from "../../api/user-api";
import AuthService from "../../api/auth-api";
import {Moment} from "moment";
import {authActions, getAuthUserData} from "./auth-reducer";

let initialState = {
    email: '',
    name: '',
    createDate:'' as string | Moment,
    error: '',
    success:'',
    isLoading: false
};

export enum ProfileActions {
    SET_USER_DATA,
    SET_ERROR,
    SET_LOADING,
    SET_SUCCESS
}

const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ProfileActions.SET_ERROR:
        case ProfileActions.SET_USER_DATA:
        case ProfileActions.SET_LOADING:
        case ProfileActions.SET_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const profileActions = {
    setUserData: (email: string, name: string,createDate:string | Moment) => ({
        type: ProfileActions.SET_USER_DATA, payload: {email, name,createDate}
    } as const),
    setError: (error: string) => ({
        type: ProfileActions.SET_ERROR, payload: {error}
    } as const),
    setSuccess: (success: string) => ({
        type: ProfileActions.SET_SUCCESS, payload: {success}
    } as const),
    setLoading: (loading: boolean) => ({
        type: ProfileActions.SET_LOADING,
        payload: {isLoading: loading}
    })
}

const thunkTemplate = async (thunkBody: (any), dispatch: AppDispatch) => {
    try {
        dispatch(profileActions.setLoading(true))
        if (localStorage.getItem('accessToken')) {
            await thunkBody()
        }
    } catch (e: any) {
        const msg = e.response?.data?.message || 'Unknown error'
        dispatch(profileActions.setError(msg))
    } finally {
        dispatch(profileActions.setLoading(false))
    }
}

export const getUser = (): ThunkType => async (dispatch) => {
    await thunkTemplate(async () => {
        const data = await AuthService.me()
        dispatch(profileActions.setUserData(data.user.email as string,data.user.name as string,data.user.createDate))
    },dispatch)
}

export const changePassword = (oldPassword: string, newPassword: string): ThunkType => async (dispatch) => {
    await thunkTemplate(async () =>{
        await UserService.changePassword(oldPassword, newPassword)
        dispatch(profileActions.setSuccess('Password changed'))
    }, dispatch)
}

export const changeName = (name: string): ThunkType => async (dispatch) => {
    await thunkTemplate(async () => {
        const data = await UserService.changeName(name)
        dispatch(profileActions.setUserData(data.user.email as string, data.user.name as string, data.user.createDate))
        await dispatch(getAuthUserData())
        dispatch(profileActions.setSuccess('Name changed'))
    }, dispatch)
}
export const changeEmail = (email: string): ThunkType => async (dispatch) => {
    await thunkTemplate(async () => {
        const data = await UserService.changeEmail(email)
        dispatch(profileActions.setUserData(data.user.email as string, data.user.name as string,data.user.createDate))
        dispatch(profileActions.setSuccess('Email changed'))
    }, dispatch)
}


export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof profileActions>
type ThunkType = BaseThunkType<ActionsType>

export default profileReducer;