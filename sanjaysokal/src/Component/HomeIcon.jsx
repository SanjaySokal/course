import React from 'react';
import { Link } from 'react-router-dom';

const HomeIcon = (props) => {
    return (
        <div className="col-lg-6 col-md-6">
            <div className="small-service-box">
                <div className="icon">
                    {props.icon}
                </div>
                <h3>{props.heading}</h3>
                <p>{props.para}</p>
                <Link to={props.link}>Read More <i className="fa-solid fa-chevron-right"></i></Link>
            </div>
        </div>
    )
}

export default HomeIcon