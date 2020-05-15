import React, { useEffect } from 'react'

import CalendarIcon from '@material-ui/icons/CalendarToday'

import Scheduler from '../components/Scheduler'

// Implemented using third party component 'React-big-calendar'

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
