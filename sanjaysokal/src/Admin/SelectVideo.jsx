import React, { lazy, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
const RecordedVideos = lazy(() => import("../Component/RecordedVideos"));

const SelectVideo = () => {
    const params = useParams()

    const [video, setVideo] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch(`https://api.softingart.com/video/course/${params.name}`).then(js => js.json()).then(data => setVideo(data.status)).catch(er => console.log(er))
    }, [params, count])

    const search = (e) => {
        if (e.target.value !== "") {
            fetch(`https://api.softingart.com/video/search/${e.target.value}/${params.name}`).then(js => js.json()).then(data => setVideo(data.status)).catch(er => console.log(er))
        } else {
            setCount(count + 1)
        }
    }
    return (
        <div className="row">
            <div className="col-12">
                <h2><b>Select Video</b></h2>
            </div>
            <div className="row justify-content-between">
                <div className="col-lg-5">
                    <input type="search" onChange={search} placeholder='Type a keyword' required className='form-control border' />
                </div>
                <div className="col-lg-3">
                    <Link className='btn btn-primary btn-add-course' to={`/admin/videos/${params.name}/add`}>Add New Video</Link>
                </div>
            </div>
            {video.length > 0 ?
                <>
                    {video.map((ele, id) => {
                        return <div key={id} className="col-lg-4 col-md-6 col-sm-12">
                            <RecordedVideos img={ele.thumbnail} link={`/admin/videos/${params.name}/edit/${ele.url}`} name={ele.name} />
                        </div>
                    })}
                </>
                :
                <h3><b>No data found!</b></h3>
            }
        </div>
    )
}

export default SelectVideo