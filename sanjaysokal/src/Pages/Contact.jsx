import React, { lazy, useEffect } from 'react'
const PageHeader = lazy(() => import("../Component/PageHeader"));
const ContactForm = lazy(() => import("../Component/ContactForm"));

const Contact = () => {
    useEffect(() => {
        document.title = "Contact - SoftingArt";
    }, [])
    return (
        <>
            <PageHeader data="Contact" />
            <ContactForm />
        </>
    )
}

export default Contact