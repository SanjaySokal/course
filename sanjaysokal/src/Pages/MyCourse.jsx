import React, { lazy, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyCreateContext } from "../ContextApi/HandleAllApi";
const PageHeader = lazy(() => import("../Component/PageHeader"));
const SingleCourse = lazy(() => import("../Component/SingleCourse"));

const MyCourse = () => {
    const context = useContext(MyCreateContext);
    const navigate = useNavigate();

    const [course, setCourse] = useState([]);

    useEffect(() => {
        document.title = "My Course - SoftingArt";
        if (!context.login.login) {
            navigate("/login")
        }
    }, [context, navigate])

    useEffect(() => {
        fetch("https://api.softingart.com/course/user/single", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: context.login.email }),
        }).then(js => js.json()).then(resp => setCourse(resp.status)).catch(err => console.log(err));
    }, [context])
    return (
        <>
            <PageHeader data={"My Course"} />
            <section className='section-padding'>
                <div className="container">
                    <div className="row justify-content-center">
                        {course.length > 0 ?
                            course.map((ele, id) => {
                                return <div key={id} className="col-lg-4 col-md-6 col-sm-12">
                                    <SingleCourse img={ele.course_image} link={"/my-course/" + ele.link} title={ele.course_name} user={ele.name} desc={ele.desc} price={ele.price} duration={ele.duration} />
                                </div>
                            })
                            :
                            <h2 className='text-center'><b>Please enroll in a course</b></h2>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default MyCourse