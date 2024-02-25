import React from 'react'
import { Link } from 'react-router-dom'
import image from "../img/course-category.png";

const RecordedVideos = (props) => {
    return (
        <Link to={props.link} className='video-card'>
            <img src={props.img === "" ? image : "https://api.softingart.com/api/files/images/" + props.img} className='w-100' alt="" />
            <p>{props.name}</p>
        </Link>
    )
}

export default RecordedVideos