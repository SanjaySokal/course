var express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
var router = express.Router();
var connection = require("../connection");
var mailer = require("../mailer");

let key_id = "rzp_test_XY42Ne5HsUWq9G";
let key_secret = "Gq68a1Jq59pYdBBvhbpd2BfY";

// live
key_id = "rzp_live_DN6ziSKwzA5BQM";
key_secret = "kwL8aHrxgf4lQ2yqpkoD9Sd4";

router.get("/all", (req, resp) => {
    connection.query(`SELECT * FROM orders ORDER BY date DESC`, (err, data) => {
        if (!err) {
            resp.send({ status: data });
        } else {
            resp.send({ status: "failed" });
        }
    })
})

router.post("/orders", async (req, resp) => {
    try {
        const razorpay = new Razorpay({
            key_id: key_id,
            key_secret: key_secret
        });

        const options = req.body;
        const order = await razorpay.orders.create(options);
        if (!order) {
            resp.send({ status: "failed" })
        } else {
            resp.send({ status: order })
        }
    } catch (error) {
        resp.send({ status: error })
    }
})

router.post("/verify", async (req, resp) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sha = crypto.createHmac("sha256", key_secret);
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
        resp.json({ msg: "Transaction is not legit!" });
    } else {
        resp.json({
            status: "success",
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
        });
    }
})

router.post("/add", (req, resp) => {
    connection.query(`SELECT id FROM user WHERE email = '${req.body.email}'`, (err, data) => {
        connection.query(`SELECT id FROM course WHERE link = '${req.body.course}'`, (err2, data2) => {
            connection.query(`INSERT INTO orders(course, user, coupan, payment_status) VALUES ('${data2[0].id}','${data[0].id}','${req.body.coupan}','done')`, (err3, data3) => {
                if (!err3) {
                    resp.send({ status: "success" });
                    const html = `<html>
                    <head>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
                        <style>
                            @import url('https://fonts.googleapis.com/css2?family=Asap:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
                            * {
                                font-family: 'Urbanist', sans-serif !important;
                                box-sizing: border-box;
                            }
                            .box {
                                background-color: #F1F2FD;
                                padding: 50px;
                                border-radius: 10px;
                            }
                            @media (max-width:550px) {
                                .box {
                                    padding: 30px;
                                }
                            }
                            .btn-primary {
                                background-color: #f100fe !important;
                                border-color: #f100fe !important;
                                border-radius: 6px !important;
                                font-size: 16px !important;
                                font-weight: 600;
                                padding: 10px 25px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="box">
                                <img src="https://www.softingart.com/logo.png" width="250px" alt="SoftingArt" title="SoftingArt">
                                <h3 class="mt-4"><b>Course Enrolled Successfully!</b></h3>
                                <p class="mt-3 mb-2">
                                    You have been successfully enrolled to the course. To proceed with the course, please click on the following link:
                                </p>
                                <a target="_blank" style="padding: 10px 25px;text-decoration:none;display:inline-block;color:#fff;" href="https://www.softingart.com/my-course" class="btn btn-primary">Click here</a>
                                <p class="mt-3">
                                    <b>Note:</b> If you have any query you can contact to our support.
                                </p>
                                <p class="mt-4 mb-2"><b>Happy learning,</b></p>
                                <p>SoftingArt Team</p>
                            </div>
                        </div>
                    </body>
                    </html>`;
                    mailer.sendmail("softingart@gmail.com", req.body.email, "SoftingArt - Course Enrolled Successfully", html);
                } else {
                    resp.send({ status: "failed" });
                    console.log(err);
                }
            })
        })
    })
})

module.exports = router;