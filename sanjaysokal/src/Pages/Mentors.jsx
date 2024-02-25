import React, { lazy, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const PageHeader = lazy(() => import("../Component/PageHeader"));
const Member = lazy(() => import("../Admin/Member"));

const Mentors = () => {
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState([{ link: "/", name: "Search result affears here..." }]);

    const [data, setData] = useState([]);

    useEffect(() => {
        document.title = "Mentors - SoftingArt";
    }, [])

    const getChangeData = (e) => {
        setSearch(e.target.value);
        fetch("https://api.softingart.com/user/mentor/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ result: e.target.value }),
        }).then(js => js.json()).then(resp => {
            setSearchData(resp.status);
        }).catch(err => console.log(err));
    }

    const handleForm = (e) => {
        e.preventDefault();
        setData(searchData);
        setSearchData([]);
    }

    useEffect(() => {
        fetch("https://api.softingart.com/user/get-users/mentor").then(res => res.json()).then(resp => setData(resp.status)).catch(err => console.log(err));
    }, [])

    return (
        <>
            <PageHeader data={"Mentors"} />
            <section className='search'>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <form onSubmit={(e) => handleForm(e)}>
                                <label htmlFor="search">
                                    <div className="icon">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                    <input type="search" id='search' autoComplete="off" onChange={getChangeData} placeholder='Type a keyword' required className='form-control' />
                                    <button type='submit' className='btn btn-primary'><i className="fa-solid fa-magnifying-glass"></i></button>
                                </label>
                                <div className="suggestion">
                                    {((searchData.length === 0) || (search === "")) ? <></> : searchData.map((data, id) => <li key={id}><Link to={data.email}>{data.name} - {data.desc}</Link></li>)}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section className="login-page">
                <div className="container">
                    <div className="row justify-content-center">
                        {data.map((ele, ind) => <div key={ind} className="col-lg-4 col-md-6 col-sm-12">
                            <Member name={ele.name} desi={ele.desc} link={`/mentors/${ele.email}`} img={ele.image} socials={ele.socials} />
                        </div>)}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Mentors