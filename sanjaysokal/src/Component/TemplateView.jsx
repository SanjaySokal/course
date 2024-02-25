import React from 'react';
import img from "../img/course-category.png"

const TemplateView = (props) => {
    console.log(props.id);
    return (
        <section className='template-view'>
            <div className="container">
                <div className="title">
                    <h2>{"Template Name"}</h2>
                    <a href="/#download" download className='btn btn-primary btn-lg'>Download</a>
                </div>
                <img src={img} className='w-100' title={''} alt="" />
            </div>
        </section>
    )
}

export default TemplateView