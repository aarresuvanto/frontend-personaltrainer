import React, { useEffect } from 'react'

import CalendarIcon from '@material-ui/icons/CalendarToday'

import Scheduler from '../components/Scheduler'

const Calendar = ({ setActiveIcon }) => {
    document.title = 'Calendar'

    useEffect(() => {
        setActiveIcon(<CalendarIcon />)
    }, [])

    return (
        <div>
            <Scheduler />
        </div>
    )
}

export default Calendar
