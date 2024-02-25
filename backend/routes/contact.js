var express = require("express");
var router = express.Router();
var connection = require("../connection");
var mailer = require("../mailer");

router.post("/add", (req, resp) => {
    connection.query(`INSERT INTO contact (name, email, phone, subject, message) VALUES ('${req.body.name}','${req.body.email}','${req.body.phone}','${req.body.subject}','${req.body.message}')`, (err, data) => {
        if (!err) {
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
                        <h3 class="mt-4"><b>New Query!</b></h3>
                        <div class="row">
                            <div class="col-6">
                                <p><b>Name</b></p>
                            </div>
                            <div class="col-6">
                                <p>${req.body.name}</p>
                            </div>
                            <div class="col-6">
                                <p><b>Email</b></p>
                            </div>
                            <div class="col-6">
                                <p>${req.body.email}</p>
                            </div>
                            <div class="col-6">
                                <p><b>Phone</b></p>
                            </div>
                            <div class="col-6">
                                <p>${req.body.phone}</p>
                            </div>
                            <div class="col-12">
                                <p><b>Message</b></p>
                            </div>
                            <div class="col-12">
                                <p>${req.body.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>`;
            mailer.sendmail(req.body.email, "sokalsanjay@gmail.com", req.body.subject, html);
            resp.send({ status: "success" });
        } else {
            resp.send({ status: "failed" });
        }
    })
})

router.get("/all", (req, resp) => {
    connection.query(`SELECT * FROM contact ORDER BY date DESC`, (err, data) => {
        if (!err) {
            resp.send({ status: data });
        } else {
            resp.send({ status: "failed" });
        }
    })
})

module.exports = router;