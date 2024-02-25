import React, { lazy, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const RecordedVideos = lazy(() => import("../Component/RecordedVideos"));

const Courses = () => {
    const [course, setCourse] = useState([]);

    useEffect(() => {
        fetch("https://api.softingart.com/course/all/user").then(res => res.json()).then(data => setCourse(data.status)).catch(err => console.log(err))
    }, [])

    const searchResult = (e) => {
        if (e.target.value.trim() !== "") {
            fetch(`https://api.softingart.com/course/search/${e.target.value.trim()}`).then(res => res.json()).then(resp => setCourse(resp.status)).catch(err => console.log(err));
        }
    }

    return (
        <>
            <div className="row">
                <div className="row justify-content-between">
                    <div className="col-lg-5">
                        <input type="search" placeholder='Type a keyword' onChange={searchResult} required className='form-control border' />
                    </div>
                    <div className="col-lg-3">
                        <Link className='btn btn-primary btn-add-course' to={"/admin/courses/add"}>Add New Course</Link>
                    </div>
                </div>
                {course.map((ele, id) => {
                    return <div key={id} className="col-lg-4 col-md-6 col-sm-12">
                        <RecordedVideos img={ele.course_img} link={`/admin/courses/edit/${ele.link}`} name={ele.course_name} />
                    </div>
                })}
            </div>
        </>
    )
}

export default Courses