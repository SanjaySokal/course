import React, { lazy, useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { MyCreateContext } from "../ContextApi/HandleAllApi";
const MyCourseHeader = lazy(() => import("../Component/MyCourseHeader"));

const CoursePlayer = () => {
    const params = useParams();
    const context = useContext(MyCreateContext);
    const navigate = useNavigate();
    const [couseName, setName] = useState("Course Name")
    const [videos, setVideos] = useState([]);
    const [currentVideos, setCurrnetVideos] = useState([]);
    const [search, setSearch] = useState("")

    useEffect(() => {
        document.title = couseName + " - Videos - SoftingArt";
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
    }, [context, navigate, couseName, params.slug])
    useEffect(() => {
        fetch(`https://api.softingart.com/video/single/${params.video}`).then(js => js.json()).then(data => {
            setCurrnetVideos(data.status)
        }).catch(er => console.log(er))
        fetch(`https://api.softingart.com/course/get/course/name/${params.slug}`).then(res => res.json()).then(data => setName(data.status[0].name)).catch(err => console.log(err))
    }, [params])

    useEffect(() => {
        if (search === "") {
            fetch(`https://api.softingart.com/video/course/${params.slug}`).then(js => js.json()).then(data => setVideos(data.status)).catch(er => console.log(er))
        }
    }, [params, search])

    const searchVideos = e => {
        setSearch(e.target.value);
        if (e.target.value !== "") {
            fetch(`https://api.softingart.com/video/search/${e.target.value}/${params.slug}`).then(js => js.json()).then(data => setVideos(data.status)).catch(er => console.log(er))
        }
    }

    return (
        <>
            <MyCourseHeader data={couseName} />

            <section className='my-course-page'>
                <div className="container">
                    <div className="row">
                        {currentVideos.length > 0 ?
                            <div className="col-lg-8 col-md-12">
                                <video src={"https://api.softingart.com/api/files/videos/" + currentVideos[0].video} controls disablePictureInPicture muted controlsList="nodownload noplaybackrate" autoPlay onContextMenu={e => e.preventDefault()}></video>
                                <h2>{currentVideos[0].name}</h2>
                                {currentVideos[0].extra === "" ? <a href={"/"} rel={"noreferrer"} className='btn btn-primary' target='_blank'><i className="fa-solid fa-download"></i>&nbsp; Download Attachments</a>
                                    :
                                    <a href={currentVideos[0].extra} rel={"noreferrer"} className='btn btn-primary' target='_blank'><i className="fa-solid fa-download"></i>&nbsp; Download Attachments</a>
                                }
                                <a href={"/doubts"} rel={"noreferrer"} className='btn btn-primary ms-3' target='_blank'><i className="fa-solid fa-book-open-reader"></i>&nbsp; Doubts</a>
                            </div>
                            :
                            <div className="col-lg-8 col-md-12">
                                <h2><b>No video found!</b></h2>
                            </div>
                        }
                        <div className="col-lg-4 col-md-12">
                            <div className="course-video">
                                <input type="search" value={search} onChange={searchVideos} placeholder='Search video' required className='form-control' />
                                <ul>
                                    {videos.length > 0
                                        ?
                                        videos.map((ele, id) => {
                                            return <li key={id}>
                                                <NavLink to={`/my-course/${params.slug}/player/${ele.url}`}>{ele.name}</NavLink>
                                            </li>
                                        })
                                        :
                                        <p className='text-center'><b>No videos found</b></p>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CoursePlayer