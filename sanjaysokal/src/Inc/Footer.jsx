import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="footer-links">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <p><b>Copyright © {(new Date()).getFullYear()} | All Rights Reserved | SoftingArt</b></p>
                        </div>
                        <div className="col-md-6">
                            <div className="links">
                                {/* <Link to={"/shipping"}>Shipping</Link> */}
                                <Link to={"/terms-conditions"}>Terms & Conditions</Link>
                                <Link to={"/privacy-policy"}>Privacy Policy</Link>
                                <Link to={"/refund-policy"}>Refund Policy</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer