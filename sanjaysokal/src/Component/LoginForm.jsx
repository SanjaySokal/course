import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import FormError from './FormError';
import { MyCreateContext } from '../ContextApi/HandleAllApi';

const LoginForm = () => {
    const context = useContext(MyCreateContext);
    const [data, setData] = useState({ email: "", password: "" })

    const [error, setError] = useState(<></>);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("https://api.softingart.com/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(js => js.json()).then(resp => {
            if (resp.status === "user not verified") {
                setError(<FormError data={"Please verify your email."} class={"false"} />);
            } else if (resp.status === "password not matched") {
                setError(<FormError data={"Please enter correct password."} class={"false"} />);
            } else if (resp.status === "no user found") {
                setError(<FormError data={"No account found"} class={"false"} />);
            } else if (resp.status === "no user found") {
                setError(<FormError data={"An error found please try after some time."} class={"false"} />);
            } else {
                document.cookie = `google_verify_login_auth=${resp.status[0].email}`;
                context.changeLogin(true, resp.status[0].email, resp.status[0].role);
            }
        }).catch(err => console.log(err));
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value.trim() });
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <h3>Login</h3>
            <input type="email" required placeholder='Email' value={data.email} onChange={handleChange} name='email' className='form-control' />
            <input type="password" required placeholder='Password' value={data.password} onChange={handleChange} name='password' className='form-control' />
            <div className="links">
                <Link to={"/forgot-password"}>Get Verify Link</Link>
                <Link to={"/forgot-password"}>Forgot Passowrd</Link>
            </div>
            {error}
            <button type="submit" className='btn btn-lg btn-primary'>Login</button>
        </form>
    )
}

export default LoginForm