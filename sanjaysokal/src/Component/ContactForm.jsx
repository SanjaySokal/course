import React, { useState } from 'react'
import FormError from './FormError';
import SectionHeading from './SectionHeading';
import ContactDetails from './ContactDetails';

const ContactForm = () => {
    const details = [
        {
            icon: <i className="fa-solid fa-phone-volume"></i>,
            heading: "Have any question?",
            text: "Call: +91-88-160-786-87",
            link: "tel:+91-88-160-786-87"
        },
        {
            icon: <i className="fa-regular fa-envelope"></i>,
            heading: "Send Email",
            text: "contact@softingart.com",
            link: "mailto:contact@softingart.com"
        },
        {
            icon: <i className="fa-solid fa-location-dot"></i>,
            heading: "Visit Anytime",
            text: "SoftingArt, Sanjay colony, Sector 6, Gurugram, Haryana 122006",
            link: "https://maps.app.goo.gl/o3EYd2KmooFEgtNJ7"
        }
    ]

    const [error, setError] = useState(<></>);
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("https://api.softingart.com/contact/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(js => js.json()).then(resp => {
            if (resp.status === "failed") {
                setError(<FormError data={"Failed to send Message!"} class={"false text-center"} />);
            } else {
                setError(<FormError data={"Message sent successfully!"} class={"true text-center"} />);
                setData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: ""
                });
            }
        }).catch(err => console.log(err));
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value.trim() })
    }

    return (
        <>
            <section className='contact-page-section'>
                <SectionHeading heading={"Contact With Us"} para={"Feel Free to Write us Anytime"} />
                <div className='container'>
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <form onSubmit={handleSubmit}>
                                <div className="row justify-content-center">
                                    <div className="col-md-6">
                                        <input type="text" name="name" value={data.name} onChange={handleChange} required placeholder='Name' className='form-control' />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="email" name="email" value={data.email} onChange={handleChange} required placeholder='Email' className='form-control' />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="tel" name="phone" value={data.phone} onChange={handleChange} required placeholder='Phone' className='form-control' />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" name="subject" value={data.subject} onChange={handleChange} required placeholder='Subject' className='form-control' />
                                    </div>
                                    <div className="col-md-12">
                                        <textarea name="message" value={data.message} onChange={handleChange} className='form-control' required placeholder='Message'></textarea>
                                    </div>
                                    {error}
                                    <div className="col-md-4">
                                        <button className='btn btn-lg w-100 btn-primary' type='submit'>Submit <i className="fa-solid fa-arrow-right-long"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="links">
                    <div className="container">
                        <div className="row">
                            {details.map((data, id) => <ContactDetails key={id} icon={data.icon} heading={data.heading} text={data.text} link={data.link} />)}
                        </div>
                    </div>
                </div>
            </section>
            <iframe className='m-0 p-0' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.2794133823113!2d77.02264507456624!3d28.471130791393588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1930bf2ddf6b%3A0x313c87919d329ce2!2sSoftingArt!5e0!3m2!1sen!2sin!4v1704207520576!5m2!1sen!2sin" title='SoftingArt' style={{ width: "100%", height: "50vh" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">SoftingArt, softing, art, softing art, art softing</iframe>
        </>
    )
}

export default ContactForm
