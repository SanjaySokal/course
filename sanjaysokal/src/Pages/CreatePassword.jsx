import React, { lazy, useEffect, useState } from 'react'
import FormError from '../Component/FormError';
const PageHeader = lazy(() => import("../Component/PageHeader"));

const CreatePassword = () => {
    const [error, setError] = useState(<></>);
    const [data, setData] = useState({
        email: "",
        password: "",
        con_password: "",
        otp: ""
    })
    useEffect(() => {
        document.title = "Create Password - SoftingArt";
    }, [])
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.password === data.con_password) {
            fetch("https://api.softingart.com/user/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then(js => js.json()).then(resp => {
                if (resp.status === "not matched") {
                    setError(<FormError data={"Please enter correct OTP!"} class={"false"} />);
                } else if ((resp.status === "failed") || (resp.status === "error")) {
                    setError(<FormError data={"An error found please try after some time!"} class={"false"} />);
                } else {
                    setError(<FormError data={"Your password has been changed!"} class={"true"} />);
                    setData({
                        email: "",
                        password: "",
                        con_password: "",
                        otp: ""
                    });
                }
            }).catch(err => console.log(err));
        } else {
            setError(<FormError data={"Please enter same password!"} class={"false"} />);
        }
    }
    return (
        <>
            <PageHeader data={"Create Password"} />
            <section className='login-page'>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="d-flex">
                                <div className="column one">
                                    <form onSubmit={handleSubmit}>
                                        <h3>Create Password</h3>
                                        <input type="email" onChange={handleChange} value={data.email} required placeholder='Email' name='email' className='form-control' />
                                        <input type="password" onChange={handleChange} value={data.password} required placeholder='Password' name='password' className='form-control' />
                                        <input type="password" onChange={handleChange} value={data.con_password} required placeholder='Confirm Password' name='con_password' className='form-control' />
                                        <input type="tel" onChange={handleChange} value={data.otp} required placeholder='OTP' name='otp' className='form-control' />
                                        {error}
                                        <button type="submit" className='btn btn-lg btn-primary'>Create Password</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CreatePassword