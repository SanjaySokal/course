import React from 'react'

const FormError = (props) => {
    return (
        <p className={`form-message ${props.class}`}>{props.data}</p>
    )
}

export default FormError