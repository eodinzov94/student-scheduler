import { Calendar } from 'antd';
import React from 'react';

const MiniCalendar = () => {
    function onPanelChange(value:any, mode:any) {
        console.log(value, mode);
    }
    return (
        <div>
            <div className="calendar">
                <Calendar fullscreen={false} onPanelChange={onPanelChange} />
            </div>
        </div>
    );
};

export default MiniCalendar;