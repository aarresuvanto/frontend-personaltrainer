import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MaterialTable from 'material-table';

const Customers = ({ activePage, setActivePage }) => {
    const [customers, setCustomers] = useState()
    const [tableData, setTableData] = useState({
        columns: [
            { title: 'Firstname', field: 'firstname' },
            { title: 'Lastname', field: 'lastname' },
            { title: 'Email', field: 'email' },
            { title: 'Phone', field: 'phone' },
            { title: 'Streetaddress', field:'streetaddress' },
            { title: 'Postcode', field: 'postcode' },
            { title: 'City', field: 'city' }
          ],
        data: [],
      });

    useEffect(() => {
        axios.get('https://customerrest.herokuapp.com/api/customers')
            .then(response => {
                const data = response.data.content
                const customerObjects = data.map((customer, i) => {
                    return (
                        {
                            firstname: customer.firstname,
                            lastname: customer.lastname,
                            email: customer.email,
                            phone: customer.phone,
                            streetaddress: customer.streetaddress,
                            postcode: customer.postcode,
                            city: customer.city,
                            updateUrl: customer.links
                        }
                    )
                })
                setCustomers(data)
                setTableData({...tableData, data: customerObjects})
            })
            .catch(err => {
                console.error(err)
            })
            
    }, [])

    const postCustomer = (newCustomerObject) => {
        axios.post('https://customerrest.herokuapp.com/api/customers', newCustomerObject)
            .then(res => {
                console.log(res)
                return res
            })
            .catch(err => {
                console.error(err)
            })
    }

    const updateCustomer = (updatedCustomerObject, oldObject) => {
        axios.put(oldObject.updateUrl[0].href, updatedCustomerObject)
            .then(res => {
                return res
            })
            .catch(err => {
                console.error(err)
            })
    }

    const deleteCustomer = (customerToDelete) => {
        axios.delete(customerToDelete.updateUrl[0].href)
            .then(res => {
                return res
            })
            .catch(err => {
                console.error(err)
            })
    }
    

    if(customers) {
        return (
            <div>
                <MaterialTable
                title="Customers"
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
                        let httpResponse = postCustomer(newData)
                        console.log(httpResponse)
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
                            updateCustomer(newData, oldData)
                            return { ...prevState, data };
                        });
                        }
                    }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                        setTableData((prevState) => {
                            const data = [...prevState.data]
                            data.splice(data.indexOf(oldData), 1);
                            deleteCustomer(oldData)
                            return { ...prevState, data };
                        });
                    }, 600);
                    }),
                }}
            />
          </div>
        )
    } else {
        return (
            <div>
                <h4 style={{ marginTop: 150 }}>:)</h4>
            </div>
        )
    }

}

export default Customers
