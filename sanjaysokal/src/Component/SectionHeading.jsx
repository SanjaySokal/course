import React from 'react'

const SectionHeading = (props) => {
    return (
        <div className='section-heading'>
            <h2>{props.heading}</h2>
            <p>{props.para}</p>
        </div>
    )
}

export default SectionHeading