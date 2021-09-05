import {ResultCodesEnum} from "../../dal/api";
/*import {stopSubmit} from "redux-form";*/
import AuthService from "../../dal/auth-api"
import {BaseThunkType, InferActionsTypes} from '../Store';
import {FormAction} from 'redux-form/lib/actions';
import {IUser} from "../../types/types";

let initialState = {
    user: null as (IUser | null),
    isAuth: false,
};

export enum AuthActions {
    SET_USER_DATA,
    LOGOUT
}

const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case AuthActions.SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case AuthActions.LOGOUT: {
            localStorage.removeItem("accessToken")
            return {...state, ...action.payload}
        }
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: string | null, email: string | null, isAdmin: boolean, isAuth: boolean,) => ({
        type: AuthActions.SET_USER_DATA, payload: {user: {userId, email, isAdmin}, isAuth}
    } as const),
    logout: () => ({
        type: AuthActions.LOGOUT,
        payload: {user: {userId: null, email: null, isAdmin: false}, isAuth: false}
    })
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await AuthService.me()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let {userId, email, isAdmin} = meData.user;
        dispatch(actions.setAuthUserData(userId, email, isAdmin, true))
    } else {
        console.log(meData.message);
    }
}

export const login = (email: string, password: string): ThunkType => async (dispatch) => {
    let data = await AuthService.login(email, password);
    if (data.resultCode === ResultCodesEnum.Success) {
        const accessToken = data.accessToken || ''
        localStorage.setItem('accessToken', accessToken)
        await dispatch(getAuthUserData())
    }
    /*} else {
        let message = data.message ? data.message : "Unknown Error";
        dispatch(stopSubmit("login", {_error: message}));
    }*/
}
export const register = (email: string, password: string,password2:string): ThunkType => async (dispatch) => {
    if (password === password2) {
        let data = await AuthService.register(email, password);
        if (data.resultCode === ResultCodesEnum.Success) {
            const accessToken = data.accessToken || ''
            localStorage.setItem('accessToken', accessToken)
            await dispatch(getAuthUserData())
        }
    }
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

export default authReducer;
