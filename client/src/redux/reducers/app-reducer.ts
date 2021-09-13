import { InferActionsTypes } from "../Store";
import {getAuthUserData} from "./auth-reducer"

let initialState = {
    isLoading: true
};

export type InitialStateType = typeof initialState
export enum AppActionTypes {
    SET_LOADING
}
const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case AppActionTypes.SET_LOADING:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}


export const appActions = {
    setLoading: (loading: boolean) => ({
        type: AppActionTypes.SET_LOADING,
        payload: {isLoading:loading}
    })
}

export const initializeApp = () => (dispatch: any) => {
    try {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise])
            .then(() => {
                dispatch(appActions.setLoading(false));
            });
    }catch (e) {
        console.log(e);
    }
}

type ActionsType = InferActionsTypes<typeof appActions>
export default appReducer;
