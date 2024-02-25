import React, { useEffect, useState } from 'react';
import FormError from '../Component/FormError';

const Doubt = (props) => {
    const [myClass, setMyClass] = useState("")
    const [inpVal, setInpVal] = useState("");
    const [error, setError] = useState(<></>);
    const [rev, setRev] = useState([])

    useEffect(() => {
        if (props.user.type === "student" && (props.readBy === "mentor" || props.readBy === "admin")) {
            setMyClass("read-this");
        } else if (props.readBy === "student" && (props.user.type === "mentor" || props.user.type === "admin")) {
            setMyClass("read-this");
        } else {
            setMyClass("");
        }
        setRev(props.data);
    }, [props])

    const handleSubmit = e => {
        e.preventDefault();
        let newArr = rev;
        newArr.push({
            name: props.name,
            email: props.user.email,
            type: props.user.type,
            message: inpVal
        })
        fetch("https://api.softingart.com/doubts/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: newArr,
                read_by: props.user.type,
                id: props.id
            }),
        }).then(js => js.json()).then(resp => {
            setError(<FormError data={"Message sent successfully!"} class={"true text-center"} />);
            setInpVal("");
        }).catch(err => setError(<FormError data={"Failed to send Message!"} class={"false text-center"} />));
    }

    return (
        <>
            <li>
                <a href={'/'}
                    className={myClass}
                    data-bs-toggle="modal"
                    data-bs-target={"#exampleModalFullscreen-" + props.id}
                >
                    {props.title}
                </a>
            </li>

            <div className="modal fade" id={"exampleModalFullscreen-" + props.id} tabIndex="-1" aria-labelledby="exampleModalFullscreenLabel" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-fullscreen modal-dialog-scrollable">
                    <div className="modal-content doubts">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={"exampleModalFullscreenLabel"}>{props.title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body doubts-reply">
                            {rev.length > 0 ?
                                rev.map((ele, ind) => {
                                    return <div key={ind} className={ele.type === "student" ? "reply" : "admin"}>
                                        <p>
                                            <span title={ele.email}>{ele.name}</span>
                                            {ele.message}
                                        </p>
                                    </div>
                                })
                                :
                                <h2><b>No data found!</b></h2>
                            }
                            {error}
                        </div>
                        <form onSubmit={handleSubmit} className="modal-footer">
                            <div className="form">
                                <input type="text" value={inpVal} onChange={e => setInpVal(e.target.value)} placeholder='Type your answer' required className='form-control' />
                                <button type="submit" className="btn btn-primary">Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Doubt