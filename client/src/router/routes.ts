import React from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Courses from "../components/Courses/Courses";
import {Calendar} from "../components/Calendar/Calendar";

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact: boolean;
}

export enum RouteNames {
    LOGIN = '/login',
    REGISTER = '/register',
    COURSES = '/courses',
    CALENDAR = '/calendar',
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, exact: true, component: Login},
    {path: RouteNames.REGISTER, exact: true, component: Register}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.COURSES, exact: true, component: Courses},
    {path: RouteNames.CALENDAR, exact: true, component: Calendar}
]