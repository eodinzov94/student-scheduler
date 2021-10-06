import {Badge, Calendar as AntdCalendar, List, Spin} from 'antd';
import {Moment} from 'moment';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/Store";
import {ICourse, IEvent} from "../../types/types";
import {CoursesToEventsByDate, getEventColor} from "../../utils/HelpFunctions";
import {getCoursesData} from "../../redux/reducers/courses-reducer";

export const Calendar = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCoursesData())
    }, [])
    const isLoading = useSelector<AppStateType>(state => state.courses.isLoading) as boolean
    const courses = useSelector<AppStateType>(state => state.courses.courses) as ICourse[]
    function renderItem(event:IEvent){
        return (
            <List.Item key={event.key}>
                <List.Item.Meta title = {event.courseName} description=
                    {event.tasks.map(t => (<Badge style={{display:"block"}} status={getEventColor(t.priority)} key={t.key} text={t.taskType}/>))}/>
            </List.Item>   )
    }
    function dateCellRender(date: Moment) {
        const events: IEvent[] = CoursesToEventsByDate(date, courses,'day')
        return (
            <>
            {events.length > 0 ? <List dataSource={events} renderItem={ renderItem}/> : null}
            </> );
    }
    function monthCellRender(date:Moment){
        const events: IEvent[] = CoursesToEventsByDate(date, courses,'month')
        return (
            <>
                {events.length > 0 ? <List dataSource={events} renderItem={ renderItem}/> : null}
            </> );
    }

    return (
        <Spin spinning={isLoading}>
            <AntdCalendar dateCellRender={dateCellRender} monthCellRender={monthCellRender}/>
        </Spin>
    );
};

