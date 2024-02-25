import React, { lazy, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyCreateContext } from "../ContextApi/HandleAllApi";
import FormError from '../Component/FormError';
const PageHeader = lazy(() => import("../Component/PageHeader"))
const Doubt = lazy(() => import("../Component/Doubt"))

const Doubts = () => {
    const context = useContext(MyCreateContext);
    const navigate = useNavigate();
    const [userName, setUserName] = useState("")
    const [search, setSearch] = useState("");
    const [count, setCount] = useState(0);
    const [inp, setInp] = useState({
        name: "",
        message: ""
    })

    useEffect(() => {
        document.title = "Doubts - SoftingArt";
        if (!context.login.login) {
            navigate("/login")
        }
        fetch(`https://api.softingart.com/user/all/search/${context.login.email}`).then(js => js.json()).then(res => setUserName(res.status[0].name)).catch(err => console.log(err))
    }, [context, navigate])

    const [data, setData] = useState([])

    useEffect(() => {
        fetch("https://api.softingart.com/doubts/all").then(js => js.json()).then(res => setData(res.status)).catch(err => console.log(err))
    }, [count])

    const [error, setError] = useState(<></>);

    const handleForm = (e) => {
        e.preventDefault();
        fetch("https://api.softingart.com/doubts/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: inp.name,
                read_by: context.login.type,
                data: [{
                    name: userName,
                    email: context.login.email,
                    type: context.login.type,
                    message: inp.message
                }]
            }),
        }).then(js => js.json()).then(resp => {
            if (resp.status === "failed") {
                setError(<FormError data={"Failed to send Message!"} class={"false text-center"} />);
            } else {
                setError(<FormError data={"Message sent successfully!"} class={"true text-center"} />);
                setInp({
                    name: "",
                    message: ""
                })
                setCount(count + 1);
            }
        }).catch(err => console.log(err));
    }

    const changeValues = e => {
        setInp({ ...inp, [e.target.name]: e.target.value })
    }

    const handleSearch = e => {
        e.preventDefault()
        if (search !== "") {
            fetch("https://api.softingart.com/doubts/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    search: search
                }),
            }).then(js => js.json()).then(resp => {
                setData(resp.status)
            }).catch(err => console.log(err));
        } else {
            setCount(count + 1);
        }
    }
    return (
        <>
            <PageHeader data={"Doubts"} />
            <section className='search'>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <form onSubmit={handleSearch}>
                                <label htmlFor="search">
                                    <div className="icon">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                    <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder='Type a keyword' required className='form-control' />
                                    <button type='submit' className='btn btn-primary'><i className="fa-solid fa-magnifying-glass"></i></button>
                                </label>
                            </form>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6">
                            <button className='btn btn-primary w-100 mt-2' data-bs-toggle="modal" data-bs-target="#exampleModal2">+ Add Doubts</button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="doubt-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="doubt">
                                <ul>
                                    {
                                        data.map((ele, id) => <Doubt key={id} id={ele.id} name={userName} readBy={ele.read_by} user={context.login} title={ele.name} data={ele.data} />)
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                <div className="modal-dialog">
                    <form onSubmit={handleForm} className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel2">Add Doubt</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" value={inp.name} onChange={changeValues} placeholder='Write Topic / Video' required name='name' className='form-control' />
                            <textarea name="message" value={inp.message} onChange={changeValues} required placeholder='Explain Your Doubt' className='form-control'></textarea>
                            {error}
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Submit Doubt</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Doubts