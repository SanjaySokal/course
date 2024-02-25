import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageProgress from "../Component/ImageProgress";
import axios from 'axios';

const AddViodeoToCourse = () => {
    const params = useParams();
    const [progress, setProgress] = useState(<></>);
    const [data, setData] = useState({
        name: "",
        attachments: ""
    });

    const [img, setImg] = useState("");
    const [video, setVideo] = useState("");

    const handleChange = e => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const file = img[0];
        const videoFile = video[0];
        const random = Math.trunc(Math.random() * 1000000);

        const imgName = ((Math.random() + 1).toString(36).substring(7) + "_" + (new Date()).getDate() + "_" + (new Date()).getFullYear() + "_" + (random + "_" + file.name.replaceAll(" ", "_"))).replaceAll("-", "_");

        const vidName = ((Math.random() + 1).toString(36).substring(7) + "_" + (new Date()).getDate() + "_" + (new Date()).getFullYear() + "_" + (random + "_" + videoFile.name.replaceAll(" ", "_"))).replaceAll("-", "_");

        axios.post("https://api.softingart.com/video/upload",
            {
                name: data.name,
                attachments: data.attachments,
                img: img[0],
                video: video[0],
                course: params.name,
                img_name: imgName,
                vid_name: vidName
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
            }).then(res => {
                console.log(res.data);
                setData({
                    name: "",
                    attachments: ""
                })
            }).catch(err => console.log(err));
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
                                        <div className="col-md-12">
                                            <p className='label'>Video Name</p>
                                            <input type="text" required value={data.name} onChange={handleChange} placeholder='Name' name='name' className='form-control' />
                                        </div>
                                        <div className="col-md-12">
                                            <p className='label'>Thumbnail</p>
                                            <input type="file" required name='image' accept="image/*" onChange={e => setImg(e.target.files)} className='form-control' />
                                        </div>
                                        <div className="col-md-12">
                                            <p className='label'>Video</p>
                                            <input type="file" name='video' accept="video/*" onChange={e => setVideo(e.target.files)} className='form-control' />
                                        </div>
                                        <div className="col-md-12">
                                            <p className='label'>Extra Attachments</p>
                                            <input type="url" name='attachments' value={data.attachments} onChange={handleChange} placeholder='Extra Attachments' className='form-control' />
                                        </div>
                                    </div>
                                    {progress}
                                    <button type="submit" className='btn btn-primary'>Add Video</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}

export default AddViodeoToCourse