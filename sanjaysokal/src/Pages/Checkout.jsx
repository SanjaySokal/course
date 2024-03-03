import React, { lazy, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { MyCreateContext } from '../ContextApi/HandleAllApi';
import image from '../img/course-category.png';
import FormError from '../Component/FormError';
const PageHeader = lazy(() => import("../Component/PageHeader"));

const Checkout = () => {
    const { name } = useParams();
    const context = useContext(MyCreateContext);
    const navigate = useNavigate();

    const [input, setInput] = useState("");
    const [applied, setApplied] = useState("");
    const [price, setprice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [course, setCourse] = useState([]);
    const [lastPrice, setLastPrice] = useState(price);

    useEffect(() => {
        document.title = "Enroll Course - SoftingArt";
        if (!context.login.login) {
            navigate("/login")
        }
    }, [context, navigate])

    useEffect(() => {
        fetch("https://api.softingart.com/course/single/" + name).then(res => res.json()).then(data => {
            if (data.status.length > 0) {
                setCourse(data.status);
                setprice(parseInt(data.status[0].price));
                setLastPrice(parseInt(data.status[0].price));
            }
        }).catch(err => console.log(err))
    }, [name])

    const [error, setError] = useState(<></>);
    const [error2, setError2] = useState(<></>);

    const checkCoupan = () => {
        if (input.trim() !== "") {
            fetch("https://api.softingart.com/coupans/check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code: input.trim(), link: name }),
            }).then(js => js.json()).then(resp => {
                setApplied(input);
                if (resp.status === "failed") {
                    setError(<FormError data={"No coupan found!"} class={"false"} />);
                    setDiscount(0);
                    setLastPrice(price);
                } else {
                    setError(<FormError data={resp.status + "% discount applied!"} class={"true"} />);
                    const newPrice = (price / 100) * resp.status;
                    setDiscount(newPrice);
                    setLastPrice(price - newPrice);
                }
            }).catch(err => console.log(err));
        } else {
            setError(<FormError data={"Please input a coupan code!"} class={"false"} />);
        }
    }

    const placeOrder = async (e) => {
        const email = context.login.email;
        const currency = "INR";
        const receipt = name + "_" + email;

        const getData = await fetch("http://api.softingart.com/order/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: lastPrice * 100,
                currency: currency,
                receipt: receipt,
                notes: {
                    email: email,
                    course: name
                }
            }),
        });

        const order = await getData.json();
        let key_id = "rzp_live_DN6ziSKwzA5BQM";
        // key_id = "rzp_test_XY42Ne5HsUWq9G";

        var options = {
            "key": key_id,
            "amount": lastPrice * 100,
            "currency": currency,
            "name": "SoftingArt",
            "description": "Purchasing courses online. Course name is " + course[0].course_name,
            "image": "https://www.softingart.com/favicon.png",
            "order_id": order.status.orderId,
            handler: async function (response) {
                const body = {
                    ...response,
                };

                const validateRes = await fetch("http://api.softingart.com/order/verify", {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const jsonRes = await validateRes.json();
                if (jsonRes.status === "success") {
                    fetch("http://api.softingart.com/order/add", {
                        method: "POST",
                        body: JSON.stringify({
                            email: email,
                            course: name,
                            coupan: applied
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }).then(res => res.json()).then(data => {
                        navigate("/order-placed");
                    }).catch(err => console.log(err))
                } else {
                    navigate("/order-failed");
                }
            },
            "prefill": {
                email: context.login.email,
                course: name
            },
            "notes": {
                email: context.login.email,
                course: name,
                coupan: input
            },
            "theme": {
                "color": "#f100fe"
            }
        };

        var rzp1 = new window.Razorpay(options);

        rzp1.on('payment.failed', function (response) {
            setError2(<FormError data={"payment was failed!"} class={"false text-center"} />);
            // alert(response.error.code);
            // alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
        });
        rzp1.open();
        e.preventDefault();
    }

    return (
        <>
            <PageHeader data={"Enroll Course"} />
            {course.length > 0 ?
                course.map((ele, id) => {
                    return <section key={id} className='course-details'>
                        <div className="container">
                            <div className="coupan">
                                <h3>Order Details</h3>
                                <img src={(ele.course_img) === "" ? image : "https://api.softingart.com/api/files/images/" + ele.course_img} title={ele.course_name} alt={ele.course_name} className='w-100' />
                                <h4>{ele.course_name}</h4>
                                <p className='label'>Have a discount coupon</p>
                                {error}
                                <div className="form">
                                    <input type="search" onChange={e => setInput(e.target.value)} value={input} placeholder='Enter Code Here' name='code' className='form-control' />
                                    <button onClick={checkCoupan} className='btn btn-primary'>Apply</button>
                                </div>
                                <ul>
                                    <li>
                                        <p>Total</p>
                                        <p><i className="fa-solid fa-indian-rupee-sign"></i>&nbsp; {ele.price} /-</p>
                                    </li>
                                    <li>
                                        <p>Discount</p>
                                        <p><i className="fa-solid fa-indian-rupee-sign"></i>&nbsp; {discount} /-</p>
                                    </li>
                                    <hr />
                                    <li>
                                        <p><b>Last Price</b></p>
                                        <p><i className="fa-solid fa-indian-rupee-sign"></i>&nbsp; <b> {lastPrice} /-</b></p>
                                    </li>
                                </ul>
                                <div className="butn">
                                    {error2}
                                    <button onClick={placeOrder} className='btn btn-primary'>Proceed to Checkout</button>
                                    <p>Terms & Conditions apply *</p>
                                </div>
                            </div>
                        </div>
                    </section>;
                })
                :
                <>
                    <section className='course-details'>
                        <div className="container">
                            <h2 className='text-center'><b>No course found</b></h2>
                        </div>
                    </section>
                </>
            }
        </>
    )
}

export default Checkout