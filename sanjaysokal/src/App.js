import React, { lazy, Suspense } from "react";
import { Route, Routes } from 'react-router-dom';
import Header from './Inc/Header'
import Footer from './Inc/Footer'
import './App.css';
import HandleAllApi from './ContextApi/HandleAllApi';
import Lazy from './Component/Lazy';
import ScrollToTop from './ScrollToTop';
const Home = lazy(() => import("./Pages/Home"));
const Contact = lazy(() => import("./Pages/Contact"));
const Courses = lazy(() => import("./Pages/Courses"));
const CourseDetail = lazy(() => import("./Pages/CourseDetail"));
const WebTemplates = lazy(() => import("./Pages/WebTemplates"));
const Images = lazy(() => import("./Pages/Images"));
const Login = lazy(() => import("./Pages/Login"));
const WebTemplateView = lazy(() => import("./Pages/WebTemplateView"));
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword"));
const CreatePassword = lazy(() => import("./Pages/CreatePassword"));
const MyCourse = lazy(() => import("./Pages/MyCourse"));
const CourseVideos = lazy(() => import("./Pages/CourseVideos"));
const CoursePlayer = lazy(() => import("./Pages/CoursePlayer"));
const Profile = lazy(() => import("./Pages/Profile"));
const AdminHome = lazy(() => import("./Admin/Home"));
const Doubts = lazy(() => import("./Pages/Doubts"));
const Mentors = lazy(() => import("./Pages/Mentors"));
const Students = lazy(() => import("./Pages/Students"));
const Checkout = lazy(() => import("./Pages/Checkout"));
const MentorDetils = lazy(() => import("./Pages/MentorDetils"));
const Terms = lazy(() => import("./Pages/Terms"));
const Refund = lazy(() => import("./Pages/Refund"));
const PrivacyPolicy = lazy(() => import("./Pages/PrivacyPolicy"));
const Shipping = lazy(() => import("./Pages/Shipping"));
const Careers = lazy(() => import("./Pages/Careers"));
const OrderPlaced = lazy(() => import("./Pages/OrderPlaced"));
const OrderFailed = lazy(() => import("./Pages/OrderFailed"));

function App() {
  return (
    <>
      <HandleAllApi>
        <Header />
        <Suspense fallback={<Lazy />}>
          <Routes>
            <Route path="*" element={<Lazy />} />
            <Route path="/" element={<Home />} />
            <Route path="/terms-conditions" element={<Terms />} />
            <Route path="/refund-policy" element={<Refund />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/doubts" element={<Doubts />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/mentors/:email" element={<MentorDetils />} />
            <Route path="/students" element={<Students />} />
            <Route path="/order-placed" element={<OrderPlaced />} />
            <Route path="/order-failed" element={<OrderFailed />} />
            <Route path="/students/:email" element={<MentorDetils />} />
            <Route path="/course/:name" element={<CourseDetail />} />
            <Route path="/course/:name/enroll" element={<Checkout />} />
            <Route path="/web-templates" element={<WebTemplates />} />
            <Route path="/web-templates/:id" element={<WebTemplateView />} />
            <Route path="/images" element={<Images />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/create-password" element={<CreatePassword />} />
            <Route path="/my-course" element={<MyCourse />} />
            <Route path="/my-course/:slug" element={<CourseVideos />} />
            <Route path="/my-course/:slug/player/:video" element={<CoursePlayer />} />
            <Route path="/admin/*" element={<AdminHome />} />
          </Routes>
        </Suspense>
        <Footer />
      </HandleAllApi>
      <ScrollToTop />
    </>
  );
}

export default App;
