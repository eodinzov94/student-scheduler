import React, {useState} from 'react';
import {Input} from 'antd';
import {ICourse} from "../../types/types";
import {useDispatch} from "react-redux";
import {addCourse, courseActions, CourseActions} from "../../redux/reducers/courses-reducer";


interface CourseRowProps {
    course: ICourse,
    onEdit: (any)
    isNew: boolean
}

export const CourseCell: React.FC<CourseRowProps> = ({course, onEdit, isNew}) => {
    const dispatch = useDispatch()
    const [name, setName] = useState(course.courseName)
    const [editMode, setEditMode] = useState(isNew)
    const save = () => {
        if(course.courseId === 'inputCourse' && name){
            dispatch(addCourse(name))
        }
        else if (name && name !== course.courseName) {
            onEdit(name)
        }else if (!name){
            setName(course.courseName)
        }
        if(course.courseId === 'inputCourse'){
            dispatch(courseActions.removeInputCourse())
        }
        setEditMode(false)
    }
    const enableEditMode = () => {
        setEditMode(true)
    }
    return (
        <>
            {editMode ?
                        <Input onChange={(e) => setName(e.target.value)} value={name}
                               placeholder={name} onPressEnter={save} onBlur={save} autoFocus={true}/>
                :
                <span style={{cursor: "pointer"}} onClick={enableEditMode}>{name}</span>}
        </>
    );
};

