import React, { useEffect } from 'react'

import ErrorIcon from '@material-ui/icons/ErrorOutline'

const PageNotFound = ({ setActiveIcon }) => {

    useEffect(() => {
        setActiveIcon(<ErrorIcon />)
    }, [])

    const errorStyle = {
        marginTop: 140,
        marginBottom: 50,
        fontWeight: 700
    }

    const textStyle = {
        fontWeight: 400
    }

    return (
        <div>
            <h2 style={errorStyle}>404</h2>
            <h4 style={textStyle}>This might not be what you are looking for ...</h4>
        </div>
    )
}

export default PageNotFound
