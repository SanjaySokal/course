import React, { lazy, useEffect, useState } from 'react'
import FormError from '../Component/FormError';
const PageHeader = lazy(() => import("../Component/PageHeader"));

const ForgotPassword = () => {
    const [error, setError] = useState(<></>);
    const [email, setEmail] = useState("");
    useEffect(() => {
        document.title = "Forgot Password - SoftingArt";
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        let url = "https://api.softingart.com/user/get-otp";
        // url = "http://localhost:8295/user/get-otp";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
        }).then(js => js.json()).then(resp => {
            if ((resp.status === "no user exist") || (resp.status === "no user found")) {
                setError(<FormError data={"No user found!"} class={"false text-center"} />);
            } else if (resp.status === "failed") {
                setError(<FormError data={"An error found please try after some time!"} class={"false text-center"} />);
            } else {
                setError(<FormError data={"Please check your mail inbox for next process!"} class={"true text-center"} />);
                setEmail("");
            }
        }).catch(err => console.log(err));
    }
    return (
        <>
            <PageHeader data={"Forgot Password"} />
            <section className='login-page'>
                <div className="container">
                    {error}
                    <div className="d-flex">
                        <div className="column">
                            <form onSubmit={handleSubmit}>
                                <h3>Forgot Password</h3>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder='Email' name='email' className='form-control' />
                                <button type="submit" className='btn btn-lg btn-primary'>Forgot Password</button>
                            </form>
                        </div>
                        <div className="column">
                            <form onSubmit={handleSubmit}>
                                <h3>Get Verify Link</h3>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder='Email' name='email' className='form-control' />
                                <button type="submit" className='btn btn-lg btn-primary'>Get Verify Link</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ForgotPassword