import React from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Courses from "../components/Courses/Courses";
import {Calendar} from "../components/Calendar/Calendar";
import Profile from "../components/Profile/Profile";

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
    PROFILE = '/profile'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, exact: true, component: Login},
    {path: RouteNames.REGISTER, exact: true, component: Register}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.COURSES, exact: true, component: Courses},
    {path: RouteNames.CALENDAR, exact: true, component: Calendar},
    {path: RouteNames.PROFILE, exact: true, component: Profile}
]