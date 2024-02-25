var express = require("express");
var router = express.Router();
var connection = require("../connection");
var mailer = require("../mailer");

router.post("/add", (req, resp) => {
    connection.query(`INSERT INTO meeting(name, course, meet_link, meet_date, meet_type, time) VALUES ('${req.body.name}','${req.body.course}','${req.body.meet_link}','${req.body.meet_date}','${req.body.meet_type}','${req.body.time}')`, (err, data) => {
        if (!err) {
            let emails = [];
            connection.query(`SELECT user.email AS user_email from user INNER JOIN orders ON orders.user = user.id INNER JOIN course ON course.id = orders.course WHERE course.link = "${req.body.course}"`, (err2, data2) => {
                for (let i = 0; i < data2.length; i++) {
                    emails.push(data2[i].user_email)
                }
            })

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
                        <h3 class="mt-4"><b>Your live class has been scheudled at ${req.body.meet_date} - ${req.body.time}</b></h3>
                        <p class="mt-3 mb-2">
                            We're excited to inform you that a new class has been scheduled. Please mark your calendars for the following details:
                        </p>
                        <p>Date: ${req.body.meet_date}</p>
                        <p class="mb-2">Time: ${req.body.time}</p>
                        <a target="_blank" style="padding: 10px 25px;text-decoration:none;display:inline-block;color:#fff;" href="${req.body.meet_link}" class="btn btn-primary">Click here to join</a>
                        <p class="mt-3">
                            We look forward to your active participation!
                        </p>
                        <p class="mt-4 mb-2"><b>Happy learning,</b></p>
                        <p>SoftingArt Team</p>
                    </div>
                </div>
            </body>
            </html>`;
            mailer.sendmail("softingart@gmail.com", emails, "Your live class has been scheudled at " + req.body.meet_date + " - " + req.body.time, html);
            resp.send({ status: "success" });
        } else {
            resp.send({ status: "failed" });
        }
    })
})

router.get("/all/:link", (req, resp) => {
    connection.query(`SELECT * FROM meeting WHERE course = '${req.params.link}' ORDER BY date DESC`, (err, data) => {
        if (!err) {
            resp.send({ status: data });
        } else {
            resp.send({ status: "failed" });
        }
    })
})

router.post("/update/meet", (req, resp) => {
    connection.query(`UPDATE meeting SET status='${req.body.status}' WHERE id = '${req.body.id}'`, (err, data) => {
        if (!err) {
            resp.send({ status: data });
        } else {
            resp.send({ status: "failed" });
        }
    })
})

router.get("/get/date/:date/:link", (req, resp) => {
    connection.query(`SELECT * FROM meeting WHERE meet_date = '${req.params.date}' AND course = '${req.params.link}'`, (err, data) => {
        if (!err) {
            resp.send({ status: data });
        } else {
            resp.send({ status: "failed" });
        }
    })
})

router.get("/get/status/:status/:link", (req, resp) => {
    connection.query(`SELECT * FROM meeting WHERE status = '${req.params.status}' AND course = '${req.params.link}'`, (err, data) => {
        if (!err) {
            resp.send({ status: data });
        } else {
            resp.send({ status: "failed" });
        }
    })
})

router.get("/live/meet/:course", (req, resp) => {
    connection.query(`SELECT meet_link, meet_type, time FROM meeting WHERE course = '${req.params.course}' AND status = 'active'`, (err, data) => {
        resp.send({ status: data })
    })
})

module.exports = router;