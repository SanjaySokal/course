import React from 'react';
import { Link } from 'react-router-dom';
import img from '../img/cta-1.png';

const ContactSection = () => {
    return (
        <div className='contact-section'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <h2>Skills Certificate From SoftingArt Get Start Now</h2>
                        <Link to={'/contact'} className='btn btn-primary btn-lg'>
                            Get Started <i className="fa-solid fa-arrow-right-long"></i>
                        </Link>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <img src={img} alt="Get Start Now" title='Get Start Now' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactSection
