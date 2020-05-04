import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import axios from 'axios'
import moment from 'moment'

const Trainings = ({ setActivePage }) => {
    const [ trainings, setTrainings ] = useState()
    const [tableData, setTableData] = useState({
        columns: [
            { title: 'Date', field: 'date' },
            { title: 'Duration (min)', field: 'duration' },
            { title: 'Activity', field: 'activity' },
            { title: 'Customer', field: 'customer' }
          ],
        data: [],
      });

      useEffect(() => {
        axios.get('https://customerrest.herokuapp.com/gettrainings')
            .then(response => {
                const data = response.data
              
                const trainingsObjects = data.map((training, i) => {
                    return (
                        {
                            date: moment(training.date).format('DD/MM/YYYY'),
                            duration: training.duration,
                            activity: training.activity,
                            customer: training.customer.firstname + " " + training.customer.lastname,
                            updateUrl: `https://customerrest.herokuapp.com/api/trainings/${training.id}`
                        }
                    )
                })
                setTrainings(data)
                setTableData({...tableData, data: trainingsObjects})
            })
            .catch(err => {
                console.error(err)
            })
            
    }, [])

    const deleteTraining = (trainingUrl) => {
      axios.delete(trainingUrl)
        .then(res => {
          return res
        })
        .catch(err => {
          console.error(err)
        })
    }

    if(trainings) {
        return (
            <MaterialTable
            title="Trainings"
            columns={tableData.columns}
            data={tableData.data}
            editable={{
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    setTableData((prevState) => {
                      const data = [...prevState.data];
                      let deletedObject = data.splice(data.indexOf(oldData), 1);
                      console.log(deletedObject[0].updateUrl)
                      deleteTraining(deletedObject[0].updateUrl)
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
            }}
          />
        )
    } else {
        return (
            <div>
                <h4 style={{ marginTop: 150 }}>Loading</h4>
            </div>
        )
    }
}

export default Trainings
