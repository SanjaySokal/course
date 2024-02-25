import React, { useState } from 'react'
import FormError from './FormError';
import SectionHeading from './SectionHeading';

const CareerForm = () => {
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
                <SectionHeading heading={"Careers"} para={"Join SoftingArt Today - A Great Place To Work"} />
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
            </section>
        </>
    )
}

export default CareerForm
