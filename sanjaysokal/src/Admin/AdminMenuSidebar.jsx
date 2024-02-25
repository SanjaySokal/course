import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { MyCreateContext } from '../ContextApi/HandleAllApi';

const AdminMenuSidebar = () => {
    const context = useContext(MyCreateContext);
    return (
        <ul className='sidebar-menu'>
            <li>
                <NavLink to={"/admin/dashboard"}><i className="fa-solid fa-house"></i>&nbsp; Admin Home</NavLink>
            </li>
            <li>
                <NavLink to={"/admin/meeting"}><i className="fa-solid fa-record-vinyl"></i>&nbsp; Meetings</NavLink>
            </li>
            <li>
                <NavLink to={"/admin/videos"}><i className="fa-solid fa-circle-play"></i>&nbsp; Videos</NavLink>
            </li>
            {
                (context.login.type === "admin")
                    ?
                    <>
                        <li>
                            <NavLink to={"/admin/courses"}><i className="fa-solid fa-book-open-reader"></i>&nbsp; Courses</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/admin/students"}><i className="fa-solid fa-graduation-cap"></i>&nbsp; Students</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/admin/mentors"}><i className="fa-solid fa-chalkboard-user"></i>&nbsp; Mentors</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/admin/coupons"}><i className="fa-solid fa-ticket"></i>&nbsp; Coupons</NavLink>
                        </li>
                    </>
                    :
                    ""
            }

            {
                (false)
                    ?
                    <>
                        <li>
                            <NavLink to={"/admin/web-templates"}><i className="fa-solid fa-globe"></i>&nbsp; Web Templates</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/admin/images"}><i className="fa-solid fa-image"></i>&nbsp; Images</NavLink>
                        </li>
                    </>
                    :
                    ""
            }
        </ul>
    )
}

export default AdminMenuSidebar