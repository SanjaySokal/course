import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ImageProgress from '../Component/ImageProgress';
import FormError from '../Component/FormError';

const EditCourseVideo = () => {
    const params = useParams();
    const [progress, setProgress] = useState(<></>);
    const [video, setVideo] = useState([]);
    const [error, setError] = useState(<></>);
    const [data, setData] = useState({
        name: "",
        extra: ""
    })
    useEffect(() => {
        fetch(`https://api.softingart.com/video/single/${params.video}`).then(js => js.json()).then(data => {
            setVideo(data.status)
            if (data.status.length > 0) {
                setData({
                    name: data.status[0].name,
                    extra: data.status[0].extra
                });
            }
        }).catch(er => console.log(er))
    }, [params])

    const handleChange = e => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setProgress(<></>);
        fetch("https://api.softingart.com/video/upate/video/details", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                extra: data.extra,
                url: params.video
            }),
        }).then(js => js.json()).then(resp => {
            if (resp.status === "failed") {
                setError(<FormError data={"Failed to update!"} class={"false"} />);
            } else {
                setError(<FormError data={"Updated successfully!"} class={"true"} />);
            }
        }).catch(err => console.log(err));
    }

    const handleImage = e => {
        const file = e.target.files[0];
        const random = Math.trunc(Math.random() * 1000000);
        const imgName = ((Math.random() + 1).toString(36).substring(7) + "_" + (new Date()).getDate() + "_" + (new Date()).getFullYear() + "_" + (random + "_" + file.name.replaceAll(" ", "_"))).replaceAll("-", "_");
        axios.post("https://api.softingart.com/video/update/image",
            {
                image: file,
                url: params.video,
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
            }).then(res => {
                if (res.data.status === "success") {
                    console.log(res.data.status);
                } else {
                    setProgress(<p className='red'><b>failed! there is some error in backend!</b></p>);
                }
            }).catch(err => console.log(err))
    }

    return (
        <section className='admin-paddins'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12 col-md-12">
                        <div className="d-flex">
                            <div className="column one">
                                {video.length > 0 ?
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <p className='label'>Video Name</p>
                                                <input type="text" required placeholder='Name' value={data.name} onChange={handleChange} name='name' className='form-control' />
                                            </div>
                                            <div className="col-md-12">
                                                <p className='label'>Thumbnail</p>
                                                <input type="file" name='image' accept='image/*' onChange={handleImage} className='form-control' />
                                            </div>
                                            <div className="col-md-12">
                                                <p className='label'>Extra Attachments</p>
                                                <input type="url" name='extra' onChange={handleChange} value={data.extra} placeholder='Extra Attachments' className='form-control' />
                                            </div>
                                        </div>
                                        {progress}
                                        {error}
                                        <button type="submit" className='btn btn-primary'>Add Video</button>
                                    </form>
                                    :
                                    <h2><b>No data found!</b></h2>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}

export default EditCourseVideo