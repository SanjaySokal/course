import React, { lazy, useEffect } from 'react'
const PageHeader = lazy(() => import("../Component/PageHeader"));
const CareerForm = lazy(() => import("../Component/CareerForm"));

const Careers = () => {
    useEffect(() => {
        document.title = "Careers - SoftingArt";
    }, [])
    return (
        <>
            <PageHeader data="Careers" />
            <CareerForm />
        </>
    )
}

export default Careers