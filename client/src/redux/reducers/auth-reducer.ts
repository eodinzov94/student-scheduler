import {ResultCodesEnum} from "../../api/api";
import AuthService from "../../api/auth-api"
import {BaseThunkType, InferActionsTypes} from '../Store';
import {IUser} from "../../types/types";
import {appActions} from "./app-reducer";

let initialState = {
    user: null as (IUser | null),
    isAuth: false,
    error: '',
};

export enum AuthActions {
    SET_USER_DATA,
    LOGOUT,
    SET_AUTH_ERROR
}

const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case AuthActions.SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case AuthActions.LOGOUT:
            return {...state, ...action.payload}
        case AuthActions.SET_AUTH_ERROR:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const authActions = {
    setAuthUserData: (userId: string | null, email: string | null, isAdmin: boolean, isAuth: boolean,) => ({
        type: AuthActions.SET_USER_DATA, payload: {user: {userId, email, isAdmin}, isAuth}
    } as const),
    logout: () => ({
        type: AuthActions.LOGOUT,
        payload: {user: {userId: null, email: null, isAdmin: false}, isAuth: false}
    }),
    setAuthError: (msg: string) => ({
        type: AuthActions.SET_AUTH_ERROR,
        payload: {error: msg}
    }),
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    try {
        if (localStorage.getItem('accessToken')) {
            let meData = await AuthService.me()
            if (meData.resultCode === ResultCodesEnum.Success) {
                let {userId, email, isAdmin} = meData.user;
                dispatch(authActions.setAuthUserData(userId, email, isAdmin, true))
            } else {
                console.log(meData.message);
            }
        }
    }catch (e) {
        console.log(e);
    }
}

export const login = (email: string, password: string): ThunkType => async (dispatch) => {
    try {
        dispatch(appActions.setLoading(true))
        let data = await AuthService.login(email, password);
        const accessToken = data.accessToken || ''
        localStorage.setItem('accessToken', accessToken)
        await dispatch(getAuthUserData())
    } catch (e: any) {
        const msg = e.response?.data?.message || 'Incorrect login or password'
        dispatch(authActions.setAuthError(msg))
    }finally {
        dispatch(appActions.setLoading(false))
    }

}
export const logout = ():ThunkType => async (dispatch ) => {
    localStorage.removeItem("accessToken")
    dispatch(authActions.logout())
}
export const register = (email: string, password: string): ThunkType => async (dispatch) => {
    try {
        dispatch(appActions.setLoading(true))
        let data = await AuthService.register(email, password);
        const accessToken = data.accessToken as string
        localStorage.setItem('accessToken', accessToken)
        await dispatch(getAuthUserData())
    }catch (e:any) {
        const msg = e.response?.data?.message || 'Unknown registration error'
        dispatch(authActions.setAuthError(msg))
    }finally {
        dispatch(appActions.setLoading(false))
    }

}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof authActions | typeof appActions>
type ThunkType = BaseThunkType<ActionsType>

export default authReducer;
