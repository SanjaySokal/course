import React from 'react'

const MeetLink = (props) => {
    const openMeet = () => {
        window.open(props.link);
    }
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-6">
            <h2>{props.title}</h2>
            <button onClick={openMeet} title={props.time} disabled={props.disable} className='btn btn-primary'>Attend Now</button>
        </div>
    )
}

export default MeetLink