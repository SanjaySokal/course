import React from 'react';
import { Link } from 'react-router-dom';
import img from "../img/dummy.jpg";

const Member = (props) => {
    return (
        <div className='mentor'>
            <div className="img">
                <img src={(props.img === "") ? img : "https://api.softingart.com/api/files/images/" + props.img} title={props.name} alt={props.name} />
            </div>
            <div className="name">
                <Link to={props.link}>{props.name}</Link>
                <p>{props.desi}</p>
                <div className="social">
                    {props.socials.map((ele, ind) => {
                        return <div key={ind}>
                            {(ele.linkedin === "") ? "" : <a target='_blank' rel="noreferrer" href={ele.linkedin}><i className="fa-brands fa-linkedin"></i></a>}
                            {(ele.github === "") ? "" : <a target='_blank' rel="noreferrer" href={ele.github}><i className="fa-brands fa-square-github"></i></a>}
                            {(ele.facebook === "") ? "" : <a target='_blank' rel="noreferrer" href={ele.facebook}><i className="fa-brands fa-square-facebook"></i></a>}
                            {(ele.website === "") ? "" : <a target='_blank' rel="noreferrer" href={ele.website}><i className="fa-solid fa-globe"></i></a>}
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Member