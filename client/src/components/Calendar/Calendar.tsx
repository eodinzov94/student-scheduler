import { Calendar } from 'antd';
import React from 'react';

export const MiniCalendar = () => {
    function onPanelChange(value:any, mode:any) {
        console.log(value, mode);
    }
    return (
            <div className="minWidth" style={{padding:40}}>
                <Calendar onPanelChange={onPanelChange} />
            </div>
    );
};

