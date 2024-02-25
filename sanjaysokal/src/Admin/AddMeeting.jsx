import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import FormError from '../Component/FormError'

const AddMeeting = () => {
    const params = useParams();
    const [ins, setIns] = useState([])
    const [error, setError] = useState(<></>);

    useEffect(() => {
        fetch("https://api.softingart.com/user/get-users/mentor").then(res => res.json()).then(resp => {
            setIns(resp.status);
        }).catch(err => console.log(err));
    }, [])

    const [data, setData] = useState({
        name: "",
        type: "none",
        date: "",
        time: "",
        instructor: "none",
        link: ""
    })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("https://api.softingart.com/meeting/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                course: params.name,
                meet_link: data.link,
                meet_date: data.date,
                meet_type: data.type,
                time: data.time,
                date: data.date
            }),
        }).then(js => js.json()).then(resp => {
            if (resp.status === "failed") {
                setError(<FormError data={"Failed to create meeting!"} class={"false"} />);
            } else {
                setError(<FormError data={"Meeting created successfully!"} class={"true"} />);
                setData({
                    name: "",
                    type: "none",
                    date: "",
                    time: "",
                    instructor: "none",
                    link: ""
                });
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
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p className='label'>Name</p>
                                            <input type="text" onChange={handleChange} value={data.name} required placeholder='Name' name='name' className='form-control' />
                                        </div>
                                        <div className="col-md-6">
                                            <p className='label'>Type</p>
                                            <select name="type" onChange={handleChange} value={data.type} required className='form-select form-control'>
                                                <option value={"none"} disabled>Select One Option</option>
                                                <option value={"live"}>Live Class</option>
                                                <option value={"doubt"}>Doubt Class</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <p className='label'>Date</p>
                                            <input type="date" onChange={handleChange} value={data.date} required name='date' className='form-control' />
                                        </div>
                                        <div className="col-md-6">
                                            <p className='label'>Time</p>
                                            <input type="time" onChange={handleChange} value={data.time} required placeholder='time' name='time' className='form-control' />
                                        </div>
                                        <div className="col-md-6">
                                            <p className='label'>Instructor</p>
                                            <select name="instructor" onChange={handleChange} value={data.instructor} required className='form-select form-control'>
                                                <option value={"none"} disabled>Select One Option</option>
                                                {ins.map((ele, id) => {
                                                    return <option key={id} value={ele.id}>{ele.name}</option>;
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <p className='label'>Meeting Link</p>
                                            <input type="url" onChange={handleChange} value={data.link} required placeholder='Meeting Link' name='link' className='form-control' />
                                        </div>
                                    </div>
                                    {error}
                                    <button type="submit" className='btn btn-primary'>Create Meeting</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section>
    )
}

export default AddMeeting