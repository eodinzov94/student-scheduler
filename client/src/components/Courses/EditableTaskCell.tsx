import {Form, Input, InputNumber} from 'antd';
import React from 'react';
import {ITask} from "../../types/types";
interface EditableTaskCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text' | 'dataPicker' | 'select';
    task: ITask;
    index: number;
    children: React.ReactNode;
}
const EditableTaskCell :React.FC<EditableTaskCellProps> =  ({
                                                         editing,
                                                         dataIndex,
                                                         title,
                                                         inputType, task,
                                                         index,
                                                         children,
                                                         ...restProps
                                                     }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};


export default EditableTaskCell;