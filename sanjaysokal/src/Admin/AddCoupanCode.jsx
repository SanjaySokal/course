import React, { useEffect, useState } from 'react'
import FormError from '../Component/FormError';

const AddCoupanCode = () => {
    const [course, setCourse] = useState([]);
    const [error, setError] = useState(<></>);
    const [error2, setError2] = useState(<></>);
    const [selectCourse, setselectCourse] = useState([]);
    const [coupan, setCoupan] = useState({
        code: "",
        percent: ""
    });

    const [count, setCount] = useState(0);
    const [currentId, setCurrentId] = useState(0);
    const [coupanStatus, setrCoupanStatus] = useState("none")

    const handleArray = e => {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setselectCourse(value)
    }

    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`https://api.softingart.com/coupans/courses`).then(js => js.json()).then(res => {
            setCourse(res.status);
        })
    }, [])

    useEffect(() => {
        fetch(`https://api.softingart.com/coupans/all`).then(js => js.json()).then(res => {
            setData(res.status);
        })
    }, [count])

    const handleChange = (e) => {
        setCoupan({ ...coupan, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(<></>);
        if (selectCourse.length > 0) {
            fetch("https://api.softingart.com/coupans/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: coupan.code,
                    discount: coupan.percent,
                    courses: selectCourse
                }),
            }).then(js => js.json()).then(resp => {
                if (resp.status === "failed") {
                    setError(<FormError data={"Failed"} class={"false text-center"} />);
                } else if (resp.status === "exist") {
                    setError(<FormError data={"Coupan code exist"} class={"false text-center"} />);
                } else {
                    setError(<FormError data={"Added"} class={"true text-center"} />);
                    setCoupan({
                        code: "",
                        percent: ""
                    })
                    setselectCourse([])
                }
            }).catch(err => console.log(err));
        } else {
            setError(<FormError data={"Please choose course!"} class={"false text-center"} />);
        }
    }

    const updateCoupan = e => {
        e.preventDefault();
        fetch(`https://api.softingart.com/coupans/update/status/${currentId}`).then(js => js.json()).then(data => {
            if (data.status === "success") {
                setError2(<FormError data={"updated"} class={"true text-center"} />);
                setrCoupanStatus("none")
                setCount(count + 1);
            }
        }).catch(err => console.log(err))
    }

    return (
        <>
            <div className="row justify-content-between mb-4">
                <div className="col-lg-3">
                    <a className='btn btn-primary' href={"/"} data-bs-toggle="modal" data-bs-target="#exampleModal2" type='button'>Add New Coupon</a>
                </div>
            </div>
            {data.length > 0 ? <>
                {data.map((ele, id) => {
                    return <div key={id} className="meeting-box border">
                        <p>{ele.code}</p>
                        <p className="date">{ele.discount}%</p>
                        {ele.active === "1"
                            ?
                            <p className='active'>
                                <a href={"/"} title='Update status click here..' onClick={() => setCurrentId(ele.id)} data-bs-toggle="modal" data-bs-target="#exampleModal" type='button'>
                                    <i className="fa-regular fa-circle-dot"></i> active
                                </a>
                            </p>
                            :
                            <p className='cancelled'><i className="fa-regular fa-circle-dot"></i> cancelled</p>
                        }
                    </div>
                })}
            </>
                :
                <h2><b>No data found</b></h2>
            }
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form className="modal-content" onSubmit={updateCoupan}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Status</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <select name="status" required onChange={(e) => setrCoupanStatus(e.target.value)} value={coupanStatus} className='form-control border'>
                                <option value="none" disabled>Select An Option</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            {error2}
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                <div className="modal-dialog">
                    <form className="modal-content" onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel2">Create Coupons</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <select name="course" value={selectCourse} required multiple onChange={handleArray} className='form-control multi'>
                                {course.map((ele, id) => <option key={id} value={ele.id}>{ele.name}</option>)}
                            </select>
                            <input type="text" name='code' value={coupan.code} onChange={handleChange} placeholder='Coupon Code here...' className='form-control' required />
                            <input type="number" name="percent" value={coupan.percent} onChange={handleChange} placeholder='Percent' className='form-control' required />
                            {error}
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddCoupanCode