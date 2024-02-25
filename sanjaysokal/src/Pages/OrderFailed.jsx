import React, { useEffect } from 'react'
import PageHeader from '../Component/PageHeader'
import { Link } from 'react-router-dom';
import img from '../img/error.png';

const OrderPlaced = () => {
    useEffect(() => {
        document.title = "Order Failed - SoftingArt";
    }, [])

    return (
        <>
            <PageHeader data={"Order Failed"} />
            <section>
                <div className="container">
                    <div className='lazy'>
                        <img src={img} alt="loading..." title='loading...' />
                        <p className='text-center'>Your order has been failed please try again or contact us!</p>
                        <Link to={"/contact"} className='btn btn-primary'>Contact Us</Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default OrderPlaced