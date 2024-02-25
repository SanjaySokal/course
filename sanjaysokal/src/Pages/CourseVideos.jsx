import React, { lazy, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { MyCreateContext } from "../ContextApi/HandleAllApi";
const MyCourseHeader = lazy(() => import("../Component/MyCourseHeader"));
const MeetLink = lazy(() => import("../Component/MeetLink"));
const RecordedVideos = lazy(() => import("../Component/RecordedVideos"));

const CourseVideos = () => {
    const params = useParams();
    const context = useContext(MyCreateContext);
    const navigate = useNavigate();
    const [couseName, setName] = useState("Course Name")

    useEffect(() => {
        document.title = couseName + " - SoftingArt";
        if (!context.login.login) {
            navigate("/login")
        }
        fetch("https://api.softingart.com/course/user/single/link", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: context.login.email, link: params.slug }),
        }).then(js => js.json()).then(resp => {
            if (resp.status.length <= 0) {
                navigate("/courses")
            }
        }).catch(err => console.log(err));
    }, [context, navigate, couseName, params])
    const [video, setVideo] = useState([]);

    const [meet, setMeet] = useState([]);
    useEffect(() => {
        fetch(`https://api.softingart.com/course/get/course/name/${params.slug}`).then(res => res.json()).then(data => setName(data.status[0].name)).catch(err => console.log(err))
        fetch(`https://api.softingart.com/meeting/live/meet/${params.slug}`).then(res => res.json()).then(data => setMeet(data.status)).catch(err => console.log(err))
        fetch(`https://api.softingart.com/video/course/${params.slug}`).then(js => js.json()).then(data => setVideo(data.status)).catch(er => console.log(er))
    }, [params])
    return (
        <>
            <MyCourseHeader data={couseName} />

            <section className='my-course-page'>
                <div className="container">
                    <div className="meet-link">
                        <div className="row">
                            {
                                meet.length === 1
                                    ?
                                    meet[0].meet_type === "live" ?
                                        <>
                                            <MeetLink title="Live Session" time={meet[0].time} disable={false} link={meet[0].meet_link} />
                                            <MeetLink title="Doubt Session" time={"time"} disable={true} link={"/"} />
                                        </>
                                        :
                                        <>
                                            <MeetLink title="Live Session" time={"time"} disable={true} link={"/"} />
                                            <MeetLink title="Doubt Session" time={meet[0].time} disable={false} link={meet[0].meet_link} />
                                        </>
                                    :
                                    meet.length === 2
                                        ?
                                        meet[0].meet_type === "live" ?
                                            <>
                                                <MeetLink title="Live Session" time={meet[0].time} disable={false} link={meet[0].meet_link} />
                                                <MeetLink title="Doubt Session" time={meet[1].time} disable={false} link={meet[1].meet_link} />
                                            </>
                                            :
                                            <>
                                                <MeetLink title="Live Session" time={meet[1].time} disable={false} link={meet[1].meet_link} />
                                                <MeetLink title="Doubt Session" time={meet[0].time} disable={false} link={meet[0].meet_link} />
                                            </>
                                        :
                                        <>
                                            <MeetLink title="Live Session" time={"time"} disable={true} link="/" />
                                            <MeetLink title="Doubt Session" time={"time"} disable={true} link="/" />
                                        </>
                            }
                        </div>
                    </div>

                    <h2 className='mb-3'><b>Recordings</b></h2>

                    <div className="row">
                        {video.length > 0 ?
                            <>
                                {video.map((ele, id) => {
                                    return <div key={id} className="col-lg-3 col-md-6">
                                        <RecordedVideos img={ele.thumbnail} link={`/my-course/${params.slug}/player/${ele.url}`} name={ele.name} />
                                    </div>
                                })}
                            </>
                            :
                            <h3><b>No data found!</b></h3>
                        }
                    </div>
                </div>
            </section >
        </>
    )
}

export default CourseVideos