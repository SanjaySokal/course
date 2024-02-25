import React, { lazy, useContext, useEffect } from 'react'
import { MyCreateContext } from '../ContextApi/HandleAllApi';
import { useNavigate } from 'react-router-dom';
const RegisterForm = lazy(() => import("../Component/RegisterForm"));
const LoginForm = lazy(() => import("../Component/LoginForm"));
const PageHeader = lazy(() => import("../Component/PageHeader"));

const Login = () => {
    const context = useContext(MyCreateContext);
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Login - SoftingArt";
        if (context.login.login) {
            navigate("/")
        }
    }, [context, navigate])
    return (
        <>
            <PageHeader data={"Login"} />
            <section className='login-page'>
                <div className="container">
                    <div className="d-flex">
                        <div className="column">
                            <LoginForm />
                        </div>
                        <div className="column">
                            <RegisterForm />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login