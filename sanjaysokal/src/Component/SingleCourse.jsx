import React from 'react'
import { Link } from 'react-router-dom'
import image from "../img/course-category.png";

const SingleCourse = (props) => {
    return (
        <div className='course-category-box'>
            <img src={(props.img) === "" ? image : "https://api.softingart.com/api/files/images/" + props.img} alt={props.title} title={props.title} />
            <div className="content">
                <Link className='link' to={props.link}>{props.title}</Link>
                <div className="bottom-sec">
                    <div className="col-1">
                        <p><b>{props.user}</b></p>
                        <p>{props.desc}</p>
                    </div>
                    <div className="col-2">
                        <p className='price'><b><i className="fa-solid fa-indian-rupee-sign"></i> {props.price} /-</b></p>
                        <p>{props.duration}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleCourse