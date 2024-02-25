import React from 'react'
import { Link } from 'react-router-dom'

const MyCourseHeader = (props) => {
    return (
        <div className="page-title">
            <div className="container">
                <div className="center">
                    <h2>{props.data}</h2>
                    <p><Link to={"/"}>Home</Link> / <Link to={"/my-course"}>My Course</Link> / {props.data}</p>
                </div>
            </div>
        </div>
    )
}

export default MyCourseHeader