import {ResultCodeForCapcthaEnum, ResultCodesEnum} from "../api/api";
import {stopSubmit} from "redux-form";
/*import {authAPI} from '../api/auth-api';*/
import {BaseThunkType, InferActionsTypes} from '../Store';
import {Action} from 'redux';
import {FormAction} from 'redux-form/lib/actions';

let initialState = {
    userId: null as (number | null),
    email: null as string | null,
    username: null as string | null,
    isAuth: false,
};

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/auth/SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, username: string | null, isAuth: boolean) => ({
        type: 'SN/auth/SET_USER_DATA', payload: {userId, email, username, isAuth}
    } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let meData = await authAPI.me()
    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, username, email} = meData.data;
        dispatch(actions.setAuthUserData(id, email, username, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodesEnum.Success) {
        // success, get auth data
        dispatch(getAuthUserData())
    } else {

        let message = data.error ? data.error : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
}



export const logout = (): ThunkType => async (dispatch: any) => {
    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export default authReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>