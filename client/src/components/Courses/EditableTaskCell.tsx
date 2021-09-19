import React from 'react';
import {ITask} from "../../types/types";
import {InputProps} from "./TaskComponentsFactory";

interface EditableTaskCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    InputComponent: React.ComponentType<InputProps>
    task: ITask;
    index: number;
    children: React.ReactNode;
    setInputTask:React.Dispatch<React.SetStateAction<ITask | null>>
}

export const EditableTaskCell: React.FC<EditableTaskCellProps> =
    ({
         editing,
         dataIndex,
         title,
         InputComponent,
         task,
         index,
         setInputTask,
         children,
         ...restProps
     }) => {

        return (
            <td {...restProps}>
                {editing ?
                    <InputComponent setTask={setInputTask}/>
                    :
                    children
                }
            </td>
        );
    };



