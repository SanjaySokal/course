import React, { lazy, useEffect, useState } from 'react'
const RecordedVideos = lazy(() => import("../Component/RecordedVideos"));

const Meeting = () => {
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
        <div className="row">
            <div className="col-12">
                <h2><b>Select Course</b></h2>
            </div>
            <div className="row justify-content-between">
                <div className="col-lg-12">
                    <input type="search" onChange={searchResult} placeholder='Type a keyword' required className='form-control border' />
                </div>
            </div>
            {course.map((ele, id) => {
                return <div key={id} className="col-lg-4 col-md-6 col-sm-12">
                    <RecordedVideos img={ele.course_img} link={`/admin/meeting/${ele.link}`} name={ele.course_name} />
                </div>
            })}
        </div>
    )
}

export default Meeting