import {Redirect, Route, Switch } from "react-router-dom";
import {privateRoutes, publicRoutes, RouteNames} from "./routes";
import {useSelector} from "react-redux";
import {AppStateType} from "../redux/Store";


export const AppRouter = () => {
    const isAuth = useSelector<AppStateType>(state => state.auth.isAuth) as boolean
    const isLoading = useSelector<AppStateType>(state => state.app.isLoading) as boolean
    return (
        isAuth && !isLoading ?
            <Switch>
                {privateRoutes.map(route =>
                    <Route path={route.path}
                           exact={route.exact}
                           component={route.component}
                           key={route.path}
                    />
                )}
                <Redirect to={RouteNames.COURSES}/>

            </Switch>
            :
            <Switch>
                {publicRoutes.map(route =>
                    <Route path={route.path}
                           exact={route.exact}
                           component={route.component}
                           key={route.path}
                    />
                )}
                <Redirect to={RouteNames.LOGIN}/>
            </Switch>
    );
};