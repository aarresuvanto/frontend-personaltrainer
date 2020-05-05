import React, { useEffect } from 'react'

import CalendarIcon from '@material-ui/icons/CalendarToday'
import Grid from '@material-ui/core/Grid'

import Scheduler from '../components/Scheduler'

/*

Sort calendar by Month, Week, Day and list Calendar agenda

*/


const Calendar = ({ setActiveIcon, myEventsList }) => {
    useEffect(() => {
        setActiveIcon(<CalendarIcon />)
    }, [])

    const currentDate = new Date()
    console.log(currentDate)


    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={6}>

                </Grid>
                <Grid item xs={6}>
                </Grid>
            </Grid>
            <Scheduler />
        </div>
    )
}

export default Calendar
