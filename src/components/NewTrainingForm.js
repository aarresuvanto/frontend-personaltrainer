import React, { useState } from 'react'

import axios from 'axios'
import moment from 'moment'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const NewTrainingForm = ({ customerName, open, handleClose, currentRowData, currentDate }) => {
    const [ date, setDate ] = useState()
    const [ activityType, setActivityType ] = useState()
    const [ duration, setDuration ] = useState()

    const postNewTraining = () => {
        let formattedDate = moment(date).toISOString()

        let newTraining = {
            date: formattedDate,
            activity: activityType,
            duration: duration,
            customer: currentRowData.updateUrl[0].href,
        }


        axios.post('https://customerrest.herokuapp.com/api/trainings', newTraining)
            .then(res => {
                return res
            })
            .catch(err => {
                console.error(err)
            })

        handleClose()
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Training for {customerName}</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={(e) => setDate(e.target.value)}
                        id="date"
                        label="Date and time"
                        type="datetime-local"
                        defaultValue={currentDate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />
                    <TextField
                    onChange={(e) => setActivityType(e.target.value)}
                    margin="dense"
                    id="activity"
                    label="Activity type"
                    type="text"
                    fullWidth
                    />
                    <TextField
                    onChange={(e) => setDuration(e.target.value)}
                    margin="dense"
                    id="duration"
                    label="Duration"
                    type="text"
                    fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={() => postNewTraining(currentRowData.updateUrl[0].href)} color="primary">
                    Add training
                    </Button>
                </DialogActions>
            </Dialog>
      </div>
    )
}

export default NewTrainingForm
