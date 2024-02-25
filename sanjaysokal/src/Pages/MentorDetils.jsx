import React, { lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import img from "../img/dummy.jpg";
const PageHeader = lazy(() => import("../Component/PageHeader"));

const MentorDetils = () => {
    const { email } = useParams();
    const [data, setData] = useState({})
    useEffect(() => {
        fetch(`https://api.softingart.com/user/all/search/${email}`).then(data => data.json()).then(data => setData({
            name: data.status[0].name,
            email: data.status[0].email,
            phone: data.status[0].phone,
            desc: data.status[0].desc,
            description: data.status[0].description,
            image: data.status[0].image,
            linkedin: data.status[0].socials[0].linkedin,
            github: data.status[0].socials[0].github,
            facebook: data.status[0].socials[0].facebook,
            website: data.status[0].socials[0].website
        }));
    }, [email])
    return (
        <>
            <PageHeader data={"Details"} />
            <section className="login-page">
                <div className="container">
                    <div className="profile-details">
                        <div className="row">
                            <div className="col-md-3 col-sm-10">
                                <div className="img">
                                    <img src={(data.image === "") ? img : "https://api.softingart.com/api/files/images/" + data.image} className='w-100' alt={data.name} title={data.name} />
                                </div>
                            </div>
                            <div className="col-md-9 col-sm-12">
                                <h3>{data.name}</h3>
                                <p className='role'>{data.desc}</p>
                                <div className="contact">
                                    <a href={`tel:${data.phone}`}><i className="fa-solid fa-phone"></i> {data.phone}</a>
                                    <a href={`mailto:${data.email}`}><i className="fa-regular fa-envelope"></i> {data.email}</a>
                                </div>
                                <div className="description">
                                    <p>{data.description}</p>
                                </div>
                                <div className="social">
                                    {(data.linkedin === "") ? "" : <a target='_blank' rel="noreferrer" href={data.linkedin}><i className="fa-brands fa-linkedin"></i></a>}
                                    {(data.github === "") ? "" : <a target='_blank' rel="noreferrer" href={data.github}><i className="fa-brands fa-square-github"></i></a>}
                                    {(data.facebook === "") ? "" : <a target='_blank' rel="noreferrer" href={data.facebook}><i className="fa-brands fa-square-facebook"></i></a>}
                                    {(data.website === "") ? "" : <a target='_blank' rel="noreferrer" href={data.website}><i className="fa-solid fa-globe"></i></a>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MentorDetils