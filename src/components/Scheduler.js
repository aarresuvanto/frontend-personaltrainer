import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Scheduler = () => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        axios.get('https://customerrest.herokuapp.com/gettrainings')
            .then(res => {
                let allTrainings = res.data

                allTrainings = allTrainings.map(training => {
                    return (
                        { 
                            customer: training.customer.firstname + " " + training.customer.lastname,
                            activity: training.activity,
                            duration: training.duration,
                            date: training.date
                        }
                    )
                })

                const allEvents = allTrainings.map(training => {
                    let endTime = moment(training.date).add(training.duration, "minutes")
                    endTime = endTime._d

                    return (
                        {
                            start: new Date(moment(training.date).format()),
                            end: new Date(moment(endTime).format()),
                            title: training.activity + ", " + training.customer
                        }
                    )
                })
                
                setEvents(allEvents)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    return (
        <div style={{ width: '100%' }}>
            <Calendar
                events={events}
                localizer={localizer}
                defaultView='month'
                style={{ height: '80vh' }}
            />
        </div>
    )
}

export default Scheduler
