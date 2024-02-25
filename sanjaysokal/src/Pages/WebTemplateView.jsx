import React, { lazy, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MyCreateContext } from "../ContextApi/HandleAllApi";
const PageHeader = lazy(() => import("../Component/PageHeader"));
const TemplateView = lazy(() => import("../Component/TemplateView"));

const WebTemplateView = () => {
    const params = useParams();
    const context = useContext(MyCreateContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "View Template - SoftingArt";
        if (!context.login.login) {
            navigate("/login")
        }
    }, [context, navigate])

    return (
        <>
            <PageHeader data={"View Template"} />
            <TemplateView id={params.id} />
        </>
    )
}

export default WebTemplateView