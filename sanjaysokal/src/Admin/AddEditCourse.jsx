import React, { useEffect, useState } from 'react'
import ImageProgress from "../Component/ImageProgress";
import axios from 'axios';

const AddEditCourse = () => {
    const [img, setImg] = useState("");
    const [ins, setIns] = useState([])
    const [progress, setProgress] = useState(<></>);
    const [data, setData] = useState({
        name: "",
        price: "",
        description: "",
        tech: "",
        instructor: "none",
        duration: "",
        access: "none",
        languages: "none"
    })

    useEffect(() => {
        fetch("https://api.softingart.com/user/get-users/mentor").then(res => res.json()).then(resp => {
            setIns(resp.status);
        }).catch(err => console.log(err));
    }, [])

    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile.type.split("/")[0] !== "image") {
            setProgress(<p className='red'><b>please upload an image file!</b></p>);
        } else {
            setImg(uploadedFile);
        }
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (img === "") {
            setProgress(<p className='red'><b>please upload an image file!</b></p>);
        } else {
            const file = img;
            const random = Math.trunc(Math.random() * 1000000);
            const imgName = ((Math.random() + 1).toString(36).substring(7) + "_" + (new Date()).getDate() + "_" + (new Date()).getFullYear() + "_" + (random + "_" + file.name.replaceAll(" ", "_"))).replaceAll("-", "_");
            let link = data.name.toLowerCase().replaceAll(" ", "-");
            axios.post("https://api.softingart.com/course/add/new",
                {
                    name: data.name,
                    price: data.price,
                    description: data.description,
                    tech: data.tech,
                    instructor: data.instructor,
                    duration: data.duration,
                    access: data.access,
                    languages: data.languages,
                    file: img,
                    file_name: imgName,
                    link: link
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
                }).then(res => {
                    if (res.data.status === "success") {
                        setData({
                            name: "",
                            price: "",
                            description: "",
                            tech: "",
                            instructor: "none",
                            duration: "",
                            access: "none",
                            languages: "none"
                        })
                    } else {
                        console.log(res.data);
                        setProgress(<p className='red'><b>failed! there is some error in backend!</b></p>);
                    }
                }).catch(err => console.log(err))
        }
    }

    return (
        <section className='admin-paddins'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12 col-md-12">
                        <div className="d-flex">
                            <div className="column one">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p className='label'>Name</p>
                                            <input type="text" onChange={handleChange} required value={data.name} placeholder='Name' name='name' className='form-control' />
                                        </div>
                                        <div className="col-md-6">
                                            <p className='label'>Duration</p>
                                            <input type="text" onChange={handleChange} required placeholder='Duration' value={data.duration} name='duration' className='form-control' />
                                        </div>
                                        <div className="col-md-6">
                                            <p className='label'>Access</p>
                                            <select name="access" onChange={handleChange} value={data.access} required className='form-select form-control'>
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
                                            <input type="file" onChange={handleFileUpload} accept='image/*' required name='image' className='form-control' />
                                        </div>
                                        <div className="col-md-6">
                                            <p className='label'>Languages</p>
                                            <select name="languages" onChange={handleChange} value={data.languages} required className='form-select form-control'>
                                                <option value={"none"} disabled>Select One Option</option>
                                                <option value={"English"}>English</option>
                                                <option value={"Hindi"}>Hindi</option>
                                                <option value={"English & Hindi"}>English & Hindi</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <p className='label'>Course Price</p>
                                            <input type="tel" onChange={handleChange} placeholder='Course Price' value={data.price} required name='price' className='form-control' />
                                        </div>
                                        <div className="col-md-6">
                                            <p className='label'>Tech</p>
                                            <input type="text" onChange={handleChange} value={data.tech} required placeholder='Tech' name='tech' className='form-control' />
                                        </div>
                                        <div className="col-md-6">
                                            <p className='label'>Instructor</p>
                                            <select name="instructor" onChange={handleChange} required value={data.instructor} className='form-select form-control'>
                                                <option value={"none"} disabled>Select Options</option>
                                                {ins.map((ele, id) => {
                                                    return <option key={id} value={ele.id}>{ele.name}</option>;
                                                })}
                                            </select>
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
                                                    <textarea name="description" onChange={handleChange} placeholder='Write HTML code inside description.' value={data.description} required className='form-control'></textarea>
                                                </div>
                                                <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                                                    <div className='course-details p-0'>
                                                        <div className="banner">
                                                            <div className="description" dangerouslySetInnerHTML={{ __html: data.description }}>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {progress}
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

export default AddEditCourse