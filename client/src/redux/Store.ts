import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import authReducer from "./reducers/auth-reducer";
import appReducer from "./reducers/app-reducer";
import coursesReducer from "./reducers/courses-reducer";

let rootReducer = combineReducers({
    auth:authReducer,
    app:appReducer,
    courses:coursesReducer
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