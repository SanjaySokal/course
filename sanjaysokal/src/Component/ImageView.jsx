import React from 'react';
import img from '../img/page-banner.jpg';
import img2 from '../img/cta-1.png'
import img3 from '../img/course-category.png';
import img4 from '../img/service-bg-1.png';

const ImageView = () => {
    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <a href="/" target="_blank">
                        <img src={img} alt="SoftingArt" className='w-100' title={"SoftingArt"} />
                    </a>
                </div>
                <div className="col-lg-12">
                    <a href="/" target="_blank">
                        <img src={img2} alt="SoftingArt" className='w-100' title={"SoftingArt"} />
                    </a>
                </div>
                <div className="col-lg-12">
                    <a href="/" target="_blank">
                        <img src={img4} alt="SoftingArt" className='w-100' title={"SoftingArt"} />
                    </a>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <a href="/" target="_blank">
                        <img src={img4} alt="SoftingArt" className='w-100' title={"SoftingArt"} />
                    </a>
                </div>
                <div className="col-lg-12">
                    <a href="/" target="_blank">
                        <img src={img3} alt="SoftingArt" className='w-100' title={"SoftingArt"} />
                    </a>
                </div>
                <div className="col-lg-12">
                    <a href="/" target="_blank">
                        <img src={img2} alt="SoftingArt" className='w-100' title={"SoftingArt"} />
                    </a>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <a href="/" target="_blank">
                        <img src={img2} alt="SoftingArt" className='w-100' title={"SoftingArt"} />
                    </a>
                </div>
                <div className="col-lg-12">
                    <a href="/" target="_blank">
                        <img src={img3} alt="SoftingArt" className='w-100' title={"SoftingArt"} />
                    </a>
                </div>
                <div className="col-lg-12">
                    <a href="/" target="_blank">
                        <img src={img2} alt="SoftingArt" className='w-100' title={"SoftingArt"} />
                    </a>
                </div>
            </div>
        </>
    )
}

export default ImageView