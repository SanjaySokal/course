import React from 'react';

const ContactDetails = (props) => {
    return (
        <div className="col-lg-4">
            <div className="box">
                {props.icon}
                <h3>{props.heading}</h3>
                <a href={props.link}>{props.text}</a>
            </div>
        </div>
    )
}

export default ContactDetails
