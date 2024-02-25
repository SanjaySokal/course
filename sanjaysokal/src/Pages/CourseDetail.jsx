import React, { lazy, useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import image from '../img/course-category.png';
import img from '../img/dummy.jpg';
import { MyCreateContext } from '../ContextApi/HandleAllApi';
const PageHeader = lazy(() => import("../Component/PageHeader"));
const ContactSection = lazy(() => import("../Component/ContactSection"));

const CourseDetail = () => {
    const { name } = useParams();
    const context = useContext(MyCreateContext);

    const [course, setCourse] = useState([]);
    const [link, setLink] = useState({ link: "/login", text: "Login" });

    useEffect(() => {
        document.title = ((course.length > 0) ? course[0].course_name : "No course found") + " - Course - SoftingArt";
    }, [course])

    useEffect(() => {
        fetch("https://api.softingart.com/course/single/" + name).then(res => res.json()).then(data => {
            if (data.status.length > 0) {
                setCourse(data.status)
            }
        }).catch(err => console.log(err))
    }, [name])

    useEffect(() => {
        if (context.login.login) {
            fetch("https://api.softingart.com/course/user/single/link", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: context.login.email, link: name }),
            }).then(js => js.json()).then(resp => {
                if (resp.status.length > 0) {
                    setLink({ link: `/my-course/${name}`, text: "Goto Course" });
                } else {
                    setLink({ link: `/course/${name}/enroll`, text: "Get Enolled" });
                }
            }).catch(err => console.log(err));
        } else {
            setLink({ link: "/login", text: "Login" });
        }
    }, [context, name])

    return (
        <>
            {course.length > 0 ?
                course.map((ele, id) => {
                    return <div key={id}>
                        <PageHeader data={ele.course_name} />
                        <section className='course-details'>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-8">
                                        <div className="banner">
                                            <img src={(ele.course_img) === "" ? image : "https://api.softingart.com/api/files/images/" + ele.course_img} title={ele.course_name} alt={ele.course_name} className='w-100' />
                                            <div className="instructor-details">
                                                <div className="name">
                                                    <div className="image">
                                                        <img src={(ele.user_img) === "" ? img : "https://api.softingart.com/api/files/images/" + ele.user_img} alt={ele.name} title={ele.name} />
                                                    </div>
                                                    <div className="details">
                                                        <p><b>{ele.name}</b></p>
                                                        <p>{ele.desc}</p>
                                                    </div>
                                                </div>
                                                <div className="price">
                                                    <b><i className="fa-solid fa-indian-rupee-sign"></i> {ele.price} /-</b>
                                                </div>
                                            </div>
                                            <h2 className='course-name'>{ele.course_name}</h2>
                                            <div className="description" dangerouslySetInnerHTML={{ __html: ele.course_description }}>
                                            </div>
                                            <h2 className='course-name'>Instructor</h2>
                                            <div className="instructor-details big">
                                                <div className="name">
                                                    <div className="image">
                                                        <img src={(ele.user_img) === "" ? img : "https://api.softingart.com/api/files/images/" + ele.user_img} alt={ele.name} title={ele.name} />
                                                    </div>
                                                    <div className="details">
                                                        <p><b>{ele.name}</b></p>
                                                        <p>{ele.desc}</p>
                                                        <p className="text">
                                                            {ele.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="course-features">
                                            <h3>Course Features</h3>
                                            <ul>
                                                <li>
                                                    <p>
                                                        <i className="fa-solid fa-hourglass-start"></i>
                                                        Duration:
                                                    </p>
                                                    <p>
                                                        <b>{ele.duration}</b>
                                                    </p>
                                                </li>
                                                <li>
                                                    <p>
                                                        <i className="fa-solid fa-arrows-spin"></i>
                                                        Access:
                                                    </p>
                                                    <p>
                                                        <b>{ele.access}</b>
                                                    </p>
                                                </li>
                                                <li>
                                                    <p>
                                                        <i className="fa-solid fa-language"></i>
                                                        Language:
                                                    </p>
                                                    <p>
                                                        <b>{ele.language}</b>
                                                    </p>
                                                </li>
                                                <li>
                                                    <p>
                                                        <i className="fa-solid fa-indian-rupee-sign"></i>
                                                        Price:
                                                    </p>
                                                    <p>
                                                        <b>{ele.price} /-</b>
                                                    </p>
                                                </li>
                                            </ul>
                                            <Link className='btn btn-lg btn-primary w-100 mt-4' to={link.link}>{link.text} <i className="fa-solid fa-arrow-right-long"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>;
                })
                :
                <>

                    <PageHeader data={"No course found"} />
                    <section className='course-details'>
                        <div className="container">
                            <h2 className='text-center'><b>No course found</b></h2>
                        </div>
                    </section>
                </>
            }
            <ContactSection />
        </>
    )
}

export default CourseDetail