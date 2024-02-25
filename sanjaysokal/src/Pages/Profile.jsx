import React, { lazy, useContext, useEffect, useState } from 'react';
import axios from "axios";
import FormError from '../Component/FormError';
import { MyCreateContext } from '../ContextApi/HandleAllApi';
import { useNavigate } from 'react-router-dom';
import img from '../img/dummy.jpg';
import ImageProgress from "../Component/ImageProgress";
const PageHeader = lazy(() => import("../Component/PageHeader"));

const Profile = () => {
    const context = useContext(MyCreateContext);
    const navigate = useNavigate();
    const [progress, setProgress] = useState(<></>);
    useEffect(() => {
        document.title = "Profile - SoftingArt";
        if (context.login.login) {
            fetch(`https://api.softingart.com/user/${context.login.email}`).then(res => res.json()).then(data => {
                setFormData({
                    name: data.status[0].name,
                    phone: data.status[0].phone,
                    role: data.status[0].desc,
                    image: data.status[0].image,
                    description: data.status[0].description,
                    linkedin: JSON.parse(data.status[0].socials)[0].linkedin,
                    github: JSON.parse(data.status[0].socials)[0].github,
                    facebook: JSON.parse(data.status[0].socials)[0].facebook,
                    website: JSON.parse(data.status[0].socials)[0].website
                })
            }).catch(err => console.log(err))
        } else {
            navigate("/login")
        }
    }, [context, navigate])

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        role: "",
        image: "",
        description: "",
        linkedin: "",
        github: "",
        facebook: "",
        website: ""
    });

    const [error, setError] = useState(<></>);

    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];
        const file = uploadedFile;
        const random = Math.trunc(Math.random() * 1000000);
        const imgName = ((Math.random() + 1).toString(36).substring(7) + "_" + (new Date()).getDate() + "_" + (new Date()).getFullYear() + "_" + (random + "_" + file.name.replaceAll(" ", "_"))).replaceAll("-", "_");
        if (uploadedFile.type.split("/")[0] !== "image") {
            setProgress(<p className='red'><b>please upload an image file!</b></p>);
        } else {
            axios.post("https://api.softingart.com/user/profile/pic/upload",
                {
                    email: context.login.email,
                    file: uploadedFile,
                    file_name: imgName
                },
                {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': `multipart/form-data;`,
                    },
                    onUploadProgress: (data) => {
                        console.log(data.loaded, data.total);
                        var loaded = data.loaded;
                        var total = (data.total === undefined) ? 0 : (data.total);
                        var load = Math.round((loaded / total) * 100)
                        setProgress(<ImageProgress load={load} />);
                    }
                }).then(res => console.log(res)).catch(err => console.log(err))
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        fetch("https://api.softingart.com/user/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.name.trim(),
                phone: formData.phone.trim(),
                description: formData.description.trim(),
                desc: formData.role.trim(),
                socials: [{
                    linkedin: formData.linkedin.trim(),
                    github: formData.github.trim(),
                    facebook: formData.facebook.trim(),
                    website: formData.website.trim()
                }],
                email: context.login.email
            }),
        }).then(js => js.json()).then(resp => {
            if (resp.status === "failed") {
                setError(<FormError data={"Failed to Update!"} class={"false"} />);
            } else {
                setError(<FormError data={"Profile Updated!"} class={"true"} />);
            }
        }).catch(err => console.log(err));
    }

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <>
            <PageHeader data={"Profile"} />
            <section className='login-page profile'>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12 col-md-12">
                            <div className="d-flex">
                                <div className="column one">
                                    <form onSubmit={handleUpdate}>
                                        <h3>My Profile</h3>
                                        <img src={(formData.image === "") ? img : "https://api.softingart.com/api/files/images/" + formData.image} title={formData.name} alt={formData.name} />
                                        <div className="row">
                                            <div className="col-md-6">
                                                <input onChange={handleChange} value={formData.name} type="text" required placeholder='Name' name='name' className='form-control' />
                                            </div>
                                            <div className="col-md-6">
                                                <input onChange={handleChange} value={formData.role} type="text" required placeholder='Role' name='role' className='form-control' />
                                            </div>
                                            <div className="col-md-6">
                                                <input onChange={handleChange} value={formData.phone} type="tel" required placeholder='Phone' name='phone' className='form-control' />
                                            </div>
                                            <div className="col-md-6">
                                                <input onChange={handleFileUpload} accept='image/*' type="file" name='image' className='form-control' />
                                                {progress}
                                            </div>
                                            <div className="col-md-12">
                                                <textarea onChange={handleChange} value={formData.description} placeholder='Description' name='description' className='form-control' />
                                            </div>
                                            <div className="col-md-6">
                                                <input onChange={handleChange} value={formData.linkedin} type="url" placeholder='Linkedin' name='linkedin' className='form-control' />
                                            </div>
                                            <div className="col-md-6">
                                                <input onChange={handleChange} value={formData.github} type="url" placeholder='Github' name='github' className='form-control' />
                                            </div>
                                            <div className="col-md-6">
                                                <input onChange={handleChange} value={formData.facebook} type="url" placeholder='Facebook' name='facebook' className='form-control' />
                                            </div>
                                            <div className="col-md-6">
                                                <input onChange={handleChange} value={formData.website} type="url" placeholder='Website' name='website' className='form-control' />
                                            </div>
                                        </div>
                                        {error}
                                        <button type="submit" className='btn btn-primary'>Update Profile</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile