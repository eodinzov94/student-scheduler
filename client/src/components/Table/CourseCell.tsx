import React, {useState} from 'react';
import {Form, Input} from 'antd';
import {ICourse} from "../../types/types";


interface CourseRowProps {
    course: ICourse,
    onEdit: (any)
    isNew:boolean
}

export const CourseCell: React.FC<CourseRowProps> = ({course, onEdit,isNew}) => {
    const [form] = Form.useForm();
    const [name, setName] = useState(course.courseName)
    const [editMode, setEditMode] = useState(isNew)
    const save = () => {
        if (name) {
            onEdit(name)
            setEditMode(false)
        }
    }
    const enableEditMode = () => {
        setEditMode(true)
    }
    return (
        <Form form={form} component={false}>
            <Form.Item
                name="courseName"
                rules={[{required: true, message: 'Course name cannot be blank!'}]}
            >
                {editMode ?
                    <Input onChange={(e) => setName(e.target.value)} value={name}
                           placeholder={name} onPressEnter={save} onBlur={save} autoFocus={true}/>
                    : <span style={{cursor: "pointer"}} onClick={enableEditMode}>{name}</span>
                }

            </Form.Item>
        </Form>
    );
};

