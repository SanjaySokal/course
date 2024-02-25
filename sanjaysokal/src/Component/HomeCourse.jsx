import React, { useEffect, useState } from 'react';
import SectionHeading from './SectionHeading';
import SingleCourse from './SingleCourse';
import image from "../img/course-category.png"

const HomeCourse = () => {
    const [course, setCourse] = useState([{
        course_name: "",
        course_img: image,
        link: "",
        name: "",
        desc: "",
        duration: "",
        price: ""
    }]);

    useEffect(() => {
        fetch("https://api.softingart.com/course/all/user").then(res => res.json()).then(data => setCourse(data.status)).catch(err => console.log(err))
    }, [])
    return (
        <section className='section-padding'>
            <SectionHeading heading={"Best Courses"} para={"Featured Courses For You"} />
            <div className="container">
                <div className="row justify-content-center">
                    {course.length > 0 ?
                        course.map((ele, id) => {
                            return <div key={id} className="col-lg-4 col-md-6 col-sm-12">
                                <SingleCourse img={ele.course_img} link={"/course/" + ele.link} title={ele.course_name} user={ele.name} desc={ele.desc} price={ele.price} duration={ele.duration} />
                            </div>
                        })
                        :
                        <h2 className='text-center'><b>No Courses Found!</b></h2>
                    }
                </div>
            </div>
        </section>
    )
}

export default HomeCourse