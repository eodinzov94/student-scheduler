import {Badge, Calendar as AntdCalendar, List} from 'antd';
import {Moment} from 'moment';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/Store";
import {ICourse, IEvent} from "../../types/types";
import {getEventColor} from "../../utils/HelpFunctions";
import {getCoursesData} from "../../redux/reducers/courses-reducer";

export const Calendar = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCoursesData())
    }, [])
    const courses = useSelector<AppStateType>(state => state.courses.courses) as ICourse[]
    function renderItem(event:IEvent){
        return (
            <List.Item key={event.key}>
                <List.Item.Meta title = {event.courseName} description=
                    {event.tasks.map(t => (<Badge style={{display:"block"}} status={getEventColor(t.priority)} key={t.key} text={t.taskType}/>))}/>
            </List.Item>   )
    }
    function dateCellRender(date: Moment) {
        const events: IEvent[] = courses.filter(c => c.tasks.find(t =>
            date.isSame(t.deadline, 'day') && !t.completed)).map(course => ({
            courseName: course.courseName, key: course.key,
            date,
            tasks: course.tasks.filter(t => date.isSame(t.deadline, 'day'))
        }))
        return (
            <>
            {events.length > 0 ? <List dataSource={events} renderItem={ renderItem}/> : null}
            </> );
    }


    return (
        <div className="minWidth" style={{padding: 40}}>
            <AntdCalendar dateCellRender={dateCellRender}/>
        </div>
    );
};

