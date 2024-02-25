import React, { lazy, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import image from "../img/course-category.png";
const PageHeader = lazy(() => import("../Component/PageHeader"));
const SingleCourse = lazy(() => import("../Component/SingleCourse"));

const Courses = () => {
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState([]);

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
        document.title = "Courses - SoftingArt";
        fetch("https://api.softingart.com/course/all/user").then(res => res.json()).then(data => setCourse(data.status)).catch(err => console.log(err))
    }, [])

    const handleForm = (e) => {
        e.preventDefault();
        if (searchData.length !== 0) {
            setCourse(searchData);
        }
        setSearchData([]);
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
        if (e.target.value.trim() !== "") {
            fetch(`https://api.softingart.com/course/search/${e.target.value.trim()}`).then(res => res.json()).then(resp => setSearchData(resp.status)).catch(err => console.log(err));
        }
    }

    return (
        <>
            <PageHeader data={"Courses"} />
            <section className='search'>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <form onSubmit={(e) => handleForm(e)}>
                                <label htmlFor="search">
                                    <div className="icon">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                    <input type="search" autoComplete="off" onChange={handleChange} placeholder='Type a keyword' required className='form-control' />
                                    <button type='submit' className='btn btn-primary'><i className="fa-solid fa-magnifying-glass"></i></button>
                                </label>
                                <div className="suggestion">
                                    {((searchData.length === 0) || (search === "")) ? <></> : searchData.map((data, id) => <li key={id}><Link to={`/course/${data.link}`}>{data.course_name}</Link></li>)}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className='section-padding'>
                <div className="container">
                    <div className="row justify-content-center">
                        {course.map((ele, id) => {
                            return <div key={id} className="col-lg-4 col-md-6 col-sm-12">
                                <SingleCourse img={ele.course_img} link={"/course/" + ele.link} title={ele.course_name} user={ele.name} desc={ele.desc} price={ele.price} duration={ele.duration} />
                            </div>
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Courses