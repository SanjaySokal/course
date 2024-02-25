import React from 'react';
import { Link } from "react-router-dom";
import img from '../img/page-banner.jpg';
import img2 from '../img/cta-1.png'
import img3 from '../img/course-category.png';
import img4 from '../img/service-bg-1.png';

const TemplateBox = () => {
    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <Link to="/web-templates/5">
                        <img src={img} alt="SoftingArt" className='w-100' title={"SoftingArt"} />
                    </Link>
                </div>
                <div className="col-lg-12">
                    <Link to="/web-templates/5">
                        <img src={img2} alt="SoftingArt" className='w-100' title={"SoftingArt"} />
                    </Link>
                </div>
                <div className="col-lg-12">
                    <Link to="/web-templates/5">
                        <img src={img4} alt="SoftingArt" className='w-100' title={"SoftingArt"} />
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <Link to="/web-templates/5">
                        <img src={img4} alt="SoftingArt" className='w-100' title={"SoftingArt"} />
                    </Link>
                </div>
                <div className="col-lg-12">
                    <Link to="/web-templates/5">
                        <img src={img3} alt="SoftingArt" className='w-100' title={"SoftingArt"} />
                    </Link>
                </div>
                <div className="col-lg-12">
                    <Link to="/web-templates/5">
                        <img src={img2} alt="SoftingArt" className='w-100' title={"SoftingArt"} />
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <Link to="/web-templates/5">
                        <img src={img2} alt="SoftingArt" className='w-100' title={"SoftingArt"} />
                    </Link>
                </div>
                <div className="col-lg-12">
                    <Link to="/web-templates/5">
                        <img src={img3} alt="SoftingArt" className='w-100' title={"SoftingArt"} />
                    </Link>
                </div>
                <div className="col-lg-12">
                    <Link to="/web-templates/5">
                        <img src={img2} alt="SoftingArt" className='w-100' title={"SoftingArt"} />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default TemplateBox