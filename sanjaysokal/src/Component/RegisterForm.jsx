import React, { useState } from 'react'
import FormError from './FormError';

const RegisterForm = () => {
    const [data, setData] = useState({ name: "", email: "", phone: "", password: "" })
    const [error, setError] = useState(<></>);

    const handleSubmit = (e) => {
        e.preventDefault();
        let url = "https://api.softingart.com/user/register";
        // url = "http://localhost:8295/user/register";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(js => js.json()).then(resp => {
            if (resp.status === "user found") {
                setError(<FormError data={"User already exist!"} class={"false"} />);
            } else if (resp.status === "no user found") {
                setError(<FormError data={"An error found please try after some time!"} class={"false"} />);
            } else if (resp.status === "success") {
                setError(<FormError data={"Registration successful. Please verify your email!"} class={"true"} />);
                setData({ name: "", email: "", phone: "", password: "" })
            } else {
                setError(<FormError data={"User already exist!"} class={"false"} />);
            }
        }).catch(err => console.log(err));
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value.trim() });
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <h3>Register</h3>
            <input type="text" required placeholder='Name' value={data.name} onChange={handleChange} name='name' className='form-control' />
            <input type="email" required placeholder='Email' value={data.email} onChange={handleChange} name='email' className='form-control' />
            <input type="tel" required placeholder='Phone' value={data.phone} onChange={handleChange} name='phone' className='form-control' />
            <input type="password" required placeholder='Password' value={data.password} onChange={handleChange} name='password' className='form-control' />
            {error}
            <button type="submit" className='btn btn-lg btn-primary'>Register</button>
        </form>
    )
}

export default RegisterForm