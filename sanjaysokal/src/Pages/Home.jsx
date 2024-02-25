import React, { lazy, useEffect } from 'react'
const ContactSection = lazy(() => import("../Component/ContactSection"));
const HomeCategory = lazy(() => import("../Component/HomeCourse"));
const SmallServices = lazy(() => import("../Component/HomeBelowBanner"));
const HomeBanner = lazy(() => import("../Component/HomeBanner"));

const Home = () => {
    useEffect(() => {
        document.title = "Home - SoftingArt";
    }, [])

    return (
        <>
            <HomeBanner />
            <SmallServices />
            <HomeCategory />
            <ContactSection />
        </>
    )
}

export default Home
