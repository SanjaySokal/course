import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import img from "../img/logo.png";
import my from "../img/dummy.jpg";
import { MyCreateContext } from '../ContextApi/HandleAllApi';

const Header = () => {
    const context = useContext(MyCreateContext);
    const [data, setData] = useState({
        name: "",
        image: ""
    })

    useEffect(() => {
        if (context.login.email !== "") {
            fetch(`https://api.softingart.com/user/${context.login.email}`).then(res => res.json()).then(resp => setData({ name: resp.status[0].name, image: resp.status[0].image }));
        }
    }, [context])

    const logout = () => {
        document.cookie = 'google_verify_login_auth =; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        context.changeLogin(false, "", "");
    }

    return (
        <header className='fixed'>
            <nav className="navbar navbar-expand-lg bg-transparent">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src={img} alt="SoftingArt" title="SoftingArt" />
                    </Link>
                    <button className="navbar-toggler open-close-nav" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" aria-modal="true" role="dialog">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                                <Link className="navbar-brand" to="/">
                                    <img src={img} alt="SoftingArt" title="SoftingArt" />
                                </Link>
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/courses">Courses</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="/" data-bs-toggle="dropdown" aria-expanded="false">
                                        Pages
                                    </a>
                                    <ul className="dropdown-menu border">
                                        <li><NavLink className="dropdown-item" to="/mentors">Mentors</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="/students">Students</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="/careers">Careers</NavLink></li>
                                        {/* <li><NavLink className="dropdown-item" to="/web-templates">Web Templates</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="/images">Free Images</NavLink></li> */}
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/contact">Contact</NavLink>
                                </li>
                            </ul>
                            <div className="d-flex">
                                {
                                    context.login.login
                                        ?
                                        <div className='profile-nav'>
                                            <button className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                <img src={(data.image === "") ? my : "https://api.softingart.com/api/files/images/" + data.image} title={data.name} alt={data.name} />
                                                <p>{data.name}</p>
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-end border">
                                                <li><NavLink to={"/profile"} className="dropdown-item">Profile</NavLink></li>
                                                <li><NavLink to={"/my-course"} className="dropdown-item">My Course</NavLink></li>
                                                <li><NavLink to={"/doubts"} className="dropdown-item">Doubts</NavLink></li>
                                                {(context.login.type === "admin") || (context.login.type === "mentor") ? <li><NavLink to={"/admin"} className="dropdown-item">Admin Home</NavLink></li> : ""}
                                                <li><button onClick={logout} className="dropdown-item logout"><i className="fa-solid fa-arrow-right-from-bracket"></i>&nbsp; Logout</button></li>
                                            </ul>
                                        </div>
                                        :
                                        <NavLink className="btn btn-primary" to="/login">Login / Register</NavLink>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
