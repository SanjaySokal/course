import React, { lazy, useEffect } from 'react'
// import { Link } from 'react-router-dom';
const PageHeader = lazy(() => import("../Component/PageHeader"));

const Shipping = () => {
    useEffect(() => {
        document.title = "Shipping Policy - Sanjay Sokal";
    }, [])
    return (
        <>
            <PageHeader data={"Shipping Policy"} />
            <section className='login-page'>
                <div className="container">
                </div>
            </section>
        </>
    )
}

export default Shipping