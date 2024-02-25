import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FormError from '../Component/FormError';
import ImageProgress from "../Component/ImageProgress";

const EditCourse = () => {
    const params = useParams();

    const [userData, setUserData] = useState({
        name: "",
        duration: "",
        access: "",
        languages: "",
        price: "",
        description: "",
        userId: "",
        tech: "",
        instructor: "",
        id: ""
    });

    useEffect(() => {
        fetch(`https://api.softingart.com/course/single/${params.name}`).then(res => res.json()).then(resp => {
            setUserData({
                name: resp.status[0].course_name,
                duration: resp.status[0].duration,
                access: resp.status[0].access,
                languages: resp.status[0].language,
                price: resp.status[0].price,
                description: resp.status[0].course_description,
                id: resp.status[0].id,
                instructor: resp.status[0].instructor,
                link: resp.status[0].link,
                course_id: resp.status[0].course_id,
            })
        });
    }, [params])

    const [ins, setIns] = useState([])
    const [progress, setProgress] = useState(<></>);

    useEffect(() => {
        fetch("https://api.softingart.com/user/get-users/mentor").then(res => res.json()).then(resp => {
            setIns(resp.status);
        }).catch(err => console.log(err));
    }, [userData])

    const changeData = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }
    const [error, setError] = useState(<></>);

    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];
        const file = uploadedFile;
        const random = Math.trunc(Math.random() * 1000000);
        const imgName = ((Math.random() + 1).toString(36).substring(7) + "_" + (new Date()).getDate() + "_" + (new Date()).getFullYear() + "_" + (random + "_" + file.name.replaceAll(" ", "_"))).replaceAll("-", "_");
        if (uploadedFile.type.split("/")[0] !== "image") {
            setProgress(<p className='red'><b>please upload an image file!</b></p>);
        } else {
            axios.post("https://api.softingart.com/course/update/image",
                {
                    course_id: userData.course_id,
                    file: uploadedFile,
                    file_name: imgName
                },
                {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': `multipart/form-data;`,
                    },
                    onUploadProgress: (data) => {
                        var loaded = data.loaded;
                        var total = (data.total === undefined) ? 0 : (data.total);
                        var load = Math.round((loaded / total) * 100)
                        setProgress(<ImageProgress load={load} />);
                    }
                }).then(res => console.log(res)).catch(err => console.log(err))
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        fetch("https://api.softingart.com/course/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        }).then(js => js.json()).then(resp => {
            if (resp.status === "failed") {
                setError(<FormError data={"Failed to update!"} class={"false"} />);
            } else {
                setError(<FormError data={"updated successfully!"} class={"true"} />);
            }
        }).catch(err => console.log(err));
    }

    return (
        <section className='admin-paddins'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12 col-md-12">
                        <div className="d-flex">
                            <div className="column one">
                                <form onSubmit={submitHandler}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p className='label'>Name</p>
                                            <input type="text" id='name' onChange={changeData} value={userData.name} required placeholder='Name' name='name' className='form-control' />
                                        </div>
                                        <div className="col-md-6">
                                            <p className='label'>Duration</p>
                                            <input type="text" required onChange={changeData} value={userData.duration} placeholder='Duration' name='duration' className='form-control' />
                                        </div>
                                        <div className="col-md-6">
                                            <p className='label'>Access</p>
                                            <select name="access" onChange={changeData} value={userData.access} required className='form-select form-control'>
                                                <option value={"none"} disabled>Select One Option</option>
                                                <option value={"6 Months"}>6 Months</option>
                                                <option value={"1 Years"}>1 Year</option>
                                                <option value={"2 Years"}>2 Years</option>
                                                <option value={"3 Years"}>3 Years</option>
                                                <option value={"Life Time"}>Life Time</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <p className='label'>Thumbnail</p>
                                            <input type="file" accept='image/*' onChange={handleFileUpload} name='image' className='form-control' />
                                            {progress}
                                        </div>
                                        <div className="col-md-12">
                                            <p className='label'>Instructor</p>
                                            <select name="instructor" onChange={changeData} value={userData.instructor} required className='form-select form-control'>
                                                <option value={"none"} disabled>Select One Option</option>
                                                {ins.map((ele, id) => {
                                                    return <option key={id} value={ele.id}>{ele.name}</option>;
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <p className='label'>Languages</p>
                                            <select name="access" onChange={changeData} value={userData.languages} required className='form-select form-control'>
                                                <option value={"none"} disabled>Select One Option</option>
                                                <option value={"English"}>English</option>
                                                <option value={"Hindi"}>Hindi</option>
                                                <option value={"English & Hindi"}>English & Hindi</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <p className='label'>Course Price</p>
                                            <input type="tel" onChange={changeData} value={userData.price} placeholder='Course Price' required name='price' className='form-control' />
                                        </div>
                                        <div className="col-md-12">
                                            <p className='label'>Description</p>
                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">HTML</button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Preview</button>
                                                </li>
                                            </ul>
                                            <div className="tab-content" id="myTabContent">
                                                <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                                                    <textarea name="description" onChange={changeData} value={userData.description} placeholder='Please Write HTML Code' required className='form-control'>{userData.description}</textarea>
                                                </div>
                                                <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                                                    <div className='course-details p-0'>
                                                        <div className="banner">
                                                            <div className="description" dangerouslySetInnerHTML={{ __html: userData.description }}>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {error}
                                    <button type="submit" className='btn btn-primary'>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}

export default EditCourse