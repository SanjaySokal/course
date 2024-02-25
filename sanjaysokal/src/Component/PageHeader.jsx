import React from 'react';
import { Link } from 'react-router-dom';

const PageHeader = (props) => {
    return (
        <div className="page-title">
            <div className="container">
                <div className="center">
                    <h2>{props.data}</h2>
                    <p><Link to={"/"}>Home</Link> / {props.data}</p>
                </div>
            </div>
        </div>
    )
}

export default PageHeader