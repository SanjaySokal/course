import React from 'react';
import HomeIcon from './HomeIcon';

const HomeBelowBanner = () => {
    const data = [
        {
            icon: <i className="fa-solid fa-book-open-reader"></i>,
            heading: "Free Courses",
            para: "Expand your skills with our range of complimentary courses. Dive into learning without any cost, empowering your growth.",
            link: "/courses"
        },
        {
            icon: <i className="fa-solid fa-book"></i>,
            heading: "All Courses",
            para: "Discover a comprehensive array of courses tailored to suit every skill level. Explore our complete catalogue and start your learning journey today.",
            link: "/courses"
        }
    ]
    return (
        <section className="small-service">
            <div className="container">
                <div className="row">
                    {data.map((ele, index) => <HomeIcon key={index} icon={ele.icon} heading={ele.heading} para={ele.para} link={ele.link} />)}
                </div>
            </div>
        </section>
    )
}

export default HomeBelowBanner