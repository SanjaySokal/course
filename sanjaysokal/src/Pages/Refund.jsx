import React, { lazy, useEffect } from 'react'
const PageHeader = lazy(() => import("../Component/PageHeader"));

const Refund = () => {
    useEffect(() => {
        document.title = "Refund Policy - Sanjay Sokal";
    }, [])
    return (
        <>
            <PageHeader data={"Refund Policy"} />
            <section className='login-page'>
                <div className="container">
                    <h2>Cancellation & Refund Policy</h2>
                    <p>
                        We regret to inform you that we do not offer any cancellation or refund for any transactions. Once a transaction has been completed, it cannot be canceled or refunded for any reason.
                    </p>
                    <p>
                        We understand that this may be an inconvenience, but we want to be transparent and upfront about our policy. We take our commitments seriously and strive to provide the best service possible to our clients.
                    </p>
                    <p>
                        If you have any questions or concerns about our policy, please do not hesitate to contact us. We are happy to discuss any issues and provide further information as needed.
                    </p>
                    <p>Thank you for choosing SoftingArt.</p>
                </div>
            </section>
        </>
    )
}

export default Refund