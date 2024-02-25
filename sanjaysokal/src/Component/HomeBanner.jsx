import React from 'react';
import { Link } from 'react-router-dom';
import img from '../img/banner.png';

const HomeBanner = () => {
    return (
        <div className="home-banner">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <h2>Hi,
                            <p>Welcome to SoftingArt</p>
                        </h2>
                        <p>
                            Welcome to our tech education hub! Dive into our extensive course catalog, covering IT, software, and programming languages. Explore your passion, advance your skills. For personalized support or inquiries, connect with us. Start your transformative learning experience with SoftingArt today!
                        </p>
                        <div className="btns">
                            <Link className="btn btn-primary btn-lg" to="/contact">Get in Touch <i className="fa-solid fa-arrow-right-long"></i></Link>
                            <Link className="btn btn-secondary btn-lg" to="/courses">Explore Courses <i className="fa-solid fa-arrow-right-long"></i></Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <img src={img} alt="Home Banner" className="home-banner-image" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeBanner