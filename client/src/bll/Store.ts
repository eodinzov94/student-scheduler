import {Action, applyMiddleware, combineReducers, createStore ,compose} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import authReducer from "./reducers/auth-reducer";
let rootReducer = combineReducers({
    form: formReducer,
    auth:authReducer
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
// @ts-ignore
window.__store__ = store
export default store