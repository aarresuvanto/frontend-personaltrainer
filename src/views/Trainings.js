import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table';
import axios from 'axios'
import moment from 'moment'

const Trainings = ({ setActivePage }) => {
    const [ trainings, setTrainings ] = useState()
    const [tableData, setTableData] = useState({
        columns: [
            { title: 'Date', field: 'date' },
            { title: 'Duration', field: 'duration' },
            { title: 'Activity', field: 'activity' },
          ],
        data: [],
      });

      useEffect(() => {
        axios.get('https://customerrest.herokuapp.com/api/trainings')
            .then(response => {
                const data = response.data.content
                const trainingsObjects = data.map((training, i) => {
                    return (
                        {
                            date: moment(training.date).format('DD/MM/YYYY'),
                            duration: training.duration,
                            activity: training.activity,
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

    if(trainings) {
        return (
            <MaterialTable
            title="Trainings"
            columns={tableData.columns}
            data={tableData.data}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    setTableData((prevState) => {
                      const data = [...prevState.data];
                      data.push(newData);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      setTableData((prevState) => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                      });
                    }
                  }, 600);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    setTrainings((prevState) => {
                      const data = [...prevState.data];
                      data.splice(data.indexOf(oldData), 1);
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
                <h4 style={{ marginTop: 150 }}>:)</h4>
            </div>
        )
    }
}

export default Trainings
