import React, { lazy, useEffect } from 'react'
const PageHeader = lazy(() => import("../Component/PageHeader"));
const Templates = lazy(() => import("../Component/Templates"));

const WebTemplates = () => {
    useEffect(() => {
        document.title = "Web Templates - SoftingArt";
    }, [])
    return (
        <>
            <PageHeader data={"Web Templates"} />
            <Templates />
        </>
    )
}

export default WebTemplates