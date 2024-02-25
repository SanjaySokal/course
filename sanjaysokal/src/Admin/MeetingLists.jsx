import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import FormError from '../Component/FormError';

const MeetingLists = () => {
    const params = useParams();
    const [count, setCount] = useState(0);
    useEffect(() => {
        fetch(`https://api.softingart.com/meeting/all/${params.name}`).then(res => res.json()).then(data => setMeet(data.status)).catch(err => console.log(err))
    }, [params, count])
    const [meet, setMeet] = useState([]);
    const [currentId, setCurrentId] = useState(0);
    const [status, setStatus] = useState("none");
    const [error, setError] = useState(<></>);

    const updateMeeting = (e) => {
        e.preventDefault();
        fetch("https://api.softingart.com/meeting/update/meet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: status, id: currentId }),
        }).then(js => js.json()).then(resp => {
            if (resp.status === "failed") {
                setError(<FormError data={"Failed to update!"} class={"false text-center"} />);
            } else {
                setError(<FormError data={"Updated successfully!"} class={"true text-center"} />);
                setCount(count + 1);
            }
        }).catch(err => console.log(err));
    }
    const getByDate = (e) => {
        fetch(`https://api.softingart.com/meeting/get/date/${e.target.value}/${params.name}`).then(res => res.json()).then(data => setMeet(data.status)).catch(err => console.log(err))
    }
    const getByStatus = (e) => {
        fetch(`https://api.softingart.com/meeting/get/status/${e.target.value}/${params.name}`).then(res => res.json()).then(data => setMeet(data.status)).catch(err => console.log(err))
    }
    return (
        <>
            <div className="row justify-content-between">
                <div className="col-lg-5">
                    <input type="date" onChange={getByDate} required className='form-control border' />
                </div>
                <div className="col-lg-4">
                    <select name="status" onChange={getByStatus} defaultValue={"none"} className='form-control border'>
                        <option value="none" disabled>Select An Option</option>
                        <option value="active">Active</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="col-lg-3">
                    <Link className='btn btn-primary btn-add-course' to={`/admin/meeting/${params.name}/add`}>Add New Meeting</Link>
                </div>
            </div>
            {meet.length > 0 ?
                <>
                    {meet.map((ele, id) => {
                        return <div key={id} className="meeting-box border">
                            <p>{ele.name}</p>
                            <p className="date">{ele.meet_date} - {ele.time}</p>
                            {ele.status === "cancelled" ? <p className='cancelled'><i className="fa-regular fa-circle-dot"></i> cancelled</p> : ""}
                            {ele.status === "completed" ? <p className='completed'><i className="fa-regular fa-circle-dot"></i> completed</p> : ""}
                            {ele.status === "active" ?
                                <p className='active'>
                                    <a href={"/"} onClick={(e) => { setCurrentId(ele.id); setError(<></>); setStatus("none") }} title='Update status click here..' data-bs-toggle="modal" data-bs-target="#exampleModal" type='button'>
                                        <i className="fa-regular fa-circle-dot"></i> active
                                    </a>
                                </p> : ""}
                        </div>;
                    })}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <form className="modal-content" onSubmit={updateMeeting}>
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Update Status</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <select name="status" value={status} onChange={(e) => setStatus(e.target.value)} className='form-control border'>
                                        <option value="none" disabled>Select An Option</option>
                                        <option value="cancelled">Cancelled</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                    {error}
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
                :
                <h3><b>No meeting found!</b></h3>
            }
        </>
    )
}

export default MeetingLists