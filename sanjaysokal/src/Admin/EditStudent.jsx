import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormError from '../Component/FormError';

const EditStudent = () => {
    const { email } = useParams();
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        role: ""
    });
    useEffect(() => {
        fetch(`https://api.softingart.com/user/get-users/id/${email}`).then(res => res.json()).then(data => setData({
            name: data.status[0].name,
            email: data.status[0].email,
            phone: data.status[0].phone,
            role: data.status[0].role,
        })).catch(err => console.log(err));
    }, [email])

    const changeHandle = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const [error, setError] = useState(<></>);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        fetch(`https://api.softingart.com/user/update/id/${email}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(js => js.json()).then(resp => {
            if (resp.status === "failed") {
                setError(<FormError data={"Failed due to some error!"} class={"false"} />);
            } else {
                setError(<FormError data={"Successfully updated!"} class={"true"} />);
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
                                            <input type="text" required placeholder='Name' onChange={changeHandle} value={data.name} name='name' className='form-control' />
                                        </div>
                                        <div className="col-md-6">
                                            <p className='label'>Email</p>
                                            <input type="email" required placeholder='Email' onChange={changeHandle} value={data.email} name='email' className='form-control' />
                                        </div>
                                        <div className="col-md-6">
                                            <p className='label'>Phone</p>
                                            <input type="tel" required name='phone' placeholder='Phone' onChange={changeHandle} value={data.phone} className='form-control' />
                                        </div>
                                        <div className="col-md-6">
                                            <p className='label'>Role</p>
                                            <select name="role" onChange={changeHandle} defaultValue={data.role} required className='form-control'>
                                                <option value="none" disabled>Select One Option</option>
                                                <option value="student">Student</option>
                                                <option value="mentor">Mentor</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </div>
                                    </div>
                                    {error}
                                    <button type="submit" className='btn btn-primary'>Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section>
    )
}

export default EditStudent