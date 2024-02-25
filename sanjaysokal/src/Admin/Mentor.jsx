import React, { useEffect, useState } from 'react';
import Member from './Member';

const Mentor = () => {
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState(0);
    
    useEffect(() => {
        fetch("https://api.softingart.com/user/get-users/mentor").then(res => res.json()).then(resp => setData(resp.status)).catch(err => console.log(err));
    }, [update])

    const searchData = (e) => {
        if (e.target.value !== "") {
            fetch(`https://api.softingart.com/user/get-users/student/search/${e.target.value}`).then(res => res.json()).then(resp => setData(resp.status)).catch(err => console.log(err));
        } else {
            setUpdate(update + 1);
        }
    }

    return (
        <div className="row">
            <div className="row justify-content-between">
                <div className="col-lg-12">
                    <input type="search" name='search' onChange={searchData} placeholder='Type a keyword' required className='form-control border' />
                </div>
            </div>
            {data.map((ele, ind) => <div key={ind} className="col-md-6"><Member name={ele.name} desi={ele.desc} link={`/admin/mentors/${ele.id}/edit`} img={ele.image} socials={ele.socials} /></div>)}
        </div>
    )
}

export default Mentor