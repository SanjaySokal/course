import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import TemplateBox from './TemplateBox';

const Templates = () => {
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState([{ link: "/", name: "Search result affears here..." }]);

    useEffect(() => {
        setSearchData([{ link: "/", name: "Search result affears here..." }])
    }, [search])

    const handleForm = (e) => {
        e.preventDefault();
        setSearchData([]);
        console.log("Clicked");
    }
    return (
        <>
            <section className='search'>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <form onSubmit={(e) => handleForm(e)}>
                                <label htmlFor="search">
                                    <div className="icon">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                    <input type="search" id='search' value={search} onChange={e => setSearch(e.target.value)} placeholder='Type a keyword' required className='form-control' />
                                    <button type='submit' className='btn btn-primary'><i className="fa-solid fa-magnifying-glass"></i></button>
                                </label>
                                <div className="suggestion">
                                    {((searchData.length === 0) || (search === "")) ? <></> : searchData.map((data, id) => <li key={id}><Link to={data.link}>{data.name}</Link></li>)}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section className='template-page-section'>
                <div className="container">
                    <TemplateBox />
                </div>
            </section>
        </>
    )
}

export default Templates