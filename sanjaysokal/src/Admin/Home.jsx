import React, { lazy, useContext, useEffect } from 'react'
import PageHeader from '../Component/PageHeader'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { MyCreateContext } from '../ContextApi/HandleAllApi';
const AdminMenuSidebar = lazy(() => import('./AdminMenuSidebar'))
const Main = lazy(() => import('./Main'))
const Admin = lazy(() => import('./Admin'))
const Courses = lazy(() => import('./Courses'))
const Meeting = lazy(() => import('./Meeting'))
const AddEditCourse = lazy(() => import('./AddEditCourse'))
const EditCourse = lazy(() => import('./EditCourse'))
const CoursesVideos = lazy(() => import('./CoursesVideos'))
const SelectVideo = lazy(() => import('./SelectVideo'))
const AddViodeoToCourse = lazy(() => import('./AddViodeoToCourse'))
const EditCourseVideo = lazy(() => import('./EditCourseVideo'))
const MeetingLists = lazy(() => import('./MeetingLists'))
const AddMeeting = lazy(() => import('./AddMeeting'))
const WebTemplates = lazy(() => import('./WebTemplates'))
const Mentor = lazy(() => import('./Mentor'))
const EditMentor = lazy(() => import('./EditMentor'))
const Students = lazy(() => import('./Students'))
const EditStudent = lazy(() => import('./EditStudent'))
const Images = lazy(() => import('./Images'))
const AddCoupanCode = lazy(() => import('./AddCoupanCode'))

const Home = () => {
    const context = useContext(MyCreateContext);
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Admin - SoftingArt";
        if (!context.login.login || (context.login.type === "student")) {
            navigate("/login")
        }
    }, [context, navigate])
    return (
        <>
            <PageHeader data={"Admin Home"} />
            <section className='admin-section'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="sidebar">
                                <h3>DASHBOARD</h3>
                                <AdminMenuSidebar />
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <Routes>
                                <Route path="/" element={<Admin />} />
                                <Route path="/dashboard" element={<Main />} />
                                <Route path="/courses" element={<Courses />} />
                                <Route path="/coupons" element={<AddCoupanCode />} />
                                <Route path="/meeting" element={<Meeting />} />
                                <Route path="/meeting/:name" element={<MeetingLists />} />
                                <Route path="/meeting/:name/add" element={<AddMeeting />} />
                                <Route path="/videos" element={<CoursesVideos />} />
                                <Route path="/videos" element={<CoursesVideos />} />
                                <Route path="/videos/:name" element={<SelectVideo />} />
                                <Route path="/videos/:name/add" element={<AddViodeoToCourse />} />
                                <Route path="/videos/:name/edit/:video" element={<EditCourseVideo />} />
                                <Route path="/courses/add" element={<AddEditCourse />} />
                                <Route path="/courses/edit/:name" element={<EditCourse />} />
                                <Route path="/web-templates" element={<WebTemplates />} />
                                <Route path="/images" element={<Images />} />
                                <Route path="/mentors" element={<Mentor />} />
                                <Route path="/mentors/:email" element={<Mentor />} />
                                <Route path="/mentors/:email/edit" element={<EditMentor />} />
                                <Route path="/students" element={<Students />} />
                                <Route path="/students/:email" element={<Students />} />
                                <Route path="/students/:email/edit" element={<EditStudent />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home