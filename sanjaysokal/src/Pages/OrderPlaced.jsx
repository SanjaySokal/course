import React, { useEffect } from 'react'
import PageHeader from '../Component/PageHeader'
import { Link } from 'react-router-dom';
import img from '../img/check.png';

const OrderPlaced = () => {
    useEffect(() => {
        document.title = "Order Placed - SoftingArt";
    }, [])

    return (
        <>
            <PageHeader data={"Order placed"} />
            <section>
                <div className="container">
                    <div className='lazy'>
                        <img src={img} alt="loading..." title='loading...' />
                        <p className='text-center'>Thankyou your order has been placed! Please check My Course tab to view course!</p>
                        <Link to={"/my-course"} className='btn btn-primary'>Go To My Courses</Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default OrderPlaced