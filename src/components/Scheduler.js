import React, { useState } from 'react'

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Scheduler = () => {
    const [ events, setEvents ] = useState([])

    return (
        <div>
            <Calendar
                events={events}
                localizer={localizer}
                defaultView='month'
                style={{ height: '70vh' }}
            />
        </div>
    )
}

export default Scheduler
