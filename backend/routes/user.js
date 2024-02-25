var express = require("express");
var router = express.Router();
var connection = require("../connection");
var mailer = require("../mailer");
var fileUpload = require("../fileUpload");

router.get("/:email", (req, resp) => {
    connection.query("SELECT `name`, `phone`, `desc`, `description`, `socials`, `image` FROM `user` WHERE email = '" + req.params.email + "' ORDER BY date DESC", (err, data) => {
        if (err) {
            console.log(err);
            resp.send({ status: "failed" })
        } else {
            resp.send({ status: data });
        }
    })
})

router.post("/register", (req, resp) => {
    connection.query(`SELECT email FROM user WHERE email = "${req.body.email}"`, (err, data) => {
        if (err) {
            resp.send({ status: "no user found" });
        } else if (data.length > 0) {
            resp.send({ status: "user found" });
        } else {
            const random = Math.trunc(Math.random() * 1000000);
            connection.query(`INSERT INTO user (name, email, phone, role, image, socials, password, verify, otp) VALUES ('${req.body.name}','${req.body.email}','${req.body.phone}','student','','${JSON.stringify([{ "linkedin": "", "github": "", "facebook": "", "website": "" }])}','${req.body.password}','0','${random}')`, (err2, data2) => {
                if (!err2) {
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
                                <h3 class="mt-4"><b>Welcome to SoftingArt !</b></h3>
                                <p class="mt-3 mb-2">
                                    We're thrilled to have you join our community. To ensure the security of your account, please use the
                                    OTP code ${random} to verify your email and complete the registration process.
                                </p>
                                <a target="_blank" style="padding: 10px 25px;text-decoration:none;display:inline-block;color:#fff;" href="https://www.softingart.com/create-password" class="btn btn-primary">Click here</a>
                                <p class="mt-3">
                                    If you have any questions or need assistance, feel free to reach out to our support team.
                                </p>
                    
                                <p class="mt-4 mb-2"><b>Happy learning,</b></p>
                                <p>SoftingArt Team</p>
                            </div>
                        </div>
                    </body>
                    </html>`;
                    mailer.sendmail("contact@softingart.com", req.body.email, "SoftingArt - verify your email", html);
                    resp.send({ status: "success" });
                } else {
                    resp.send({ status: "failed" });
                }
            })
        }
    })
})

router.post("/login", (req, resp) => {
    connection.query(`SELECT email, password, verify, role FROM user WHERE email = "${req.body.email}"`, (err, data) => {
        if (err) {
            resp.send({ status: "error" });
        } else if (data.length > 0) {
            if (data[0].password !== req.body.password) {
                resp.send({ status: "password not matched" });
            } else if (data[0].verify !== "1") {
                resp.send({ status: "user not verified" });
            } else {
                resp.send({ status: data });
            }
        } else {
            resp.send({ status: "no user found" });
        }
    })
})

router.post("/check", (req, resp) => {
    connection.query(`SELECT email, verify, role FROM user WHERE email = "${req.body.email}" ORDER BY date DESC`, (err, data) => {
        if (err) {
            resp.send({ status: "no user found" });
        } else if (data[0].verify !== "1") {
            resp.send({ status: "user not verified" });
        } else {
            resp.send(data);
        }
    })
})

router.post("/update", (req, resp) => {
    connection.query('UPDATE `user` SET `name`="' + req.body.name + '", `phone`="' + req.body.phone + '", `description`="' + req.body.description + '", `desc`="' + req.body.desc + '", `socials`=' + `'${JSON.stringify(req.body.socials)}'` + ' WHERE `email` = "' + req.body.email + '"', (err, data) => {
        if (err) {
            console.log(err);
            resp.send({ status: "failed" });
        } else {
            resp.send({ status: "updated" });
        }
    })
})

router.post("/get-otp", (req, resp) => {
    const random = Math.trunc(Math.random() * 1000000);

    connection.query(`SELECT email FROM user WHERE email="${req.body.email}"`, (err2, data2) => {
        if (err2) {
            resp.send({ status: "no user found" });
        } else if (data2.length > 0) {

            connection.query(`UPDATE user SET otp='${random}' WHERE email = "${req.body.email}"`, (err, data) => {
                if (err) {
                    resp.send({ status: "failed" });
                } else {
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
                                <h3 class="mt-4"><b>Forgot Password!</b></h3>
                                <p class="mt-3 mb-2">
                                    We have received a request to reset the password for your account. To proceed with the password reset process, please click on the following link:
                                </p>
                                <a target="_blank" style="padding: 10px 25px;text-decoration:none;display:inline-block;color:#fff;" href="https://www.softingart.com/create-password" class="btn btn-primary">Click here</a>
                                <p class="mt-3 mb-2">Additionally, use the following One-Time Password (OTP) code to authenticate your identity: ${random}</p>
                                <p class="mt-3">
                                    <b>Note:</b> If you did not request this password reset or have any concerns, please disregard this message. Your account's security is important to us.
                                </p>
                                <p class="mt-4 mb-2"><b>Happy learning,</b></p>
                                <p>SoftingArt Team</p>
                            </div>
                        </div>
                    </body>
                    </html>`;
                    mailer.sendmail("contact@softingart.com", req.body.email, "SoftingArt - reset your password", html);

                    resp.send({ status: "updated" });
                }
            })
        } else {
            resp.send({ status: "no user exist" });
        }
    })
})

router.post("/verify-otp", (req, resp) => {
    connection.query(`SELECT otp FROM user WHERE email = "${req.body.email}"`, (err2, data2) => {
        if (err2) {
            resp.send({ status: "failed" });
        } else {
            if (data2[0].otp == req.body.otp) {
                const random = Math.trunc(Math.random() * 1000000);
                connection.query(`UPDATE user SET otp='${random}', password='${req.body.password}', verify='1' WHERE email = "${req.body.email}"`, (err, data) => {
                    if (err) {
                        resp.send({ status: "error" });
                    } else {
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
                                    <h3 class="mt-4"><b>Your Profile has been updated!</b></h3>
                                    <p class="mt-3">
                                        Congratulations! Your profile update has been successfully verified. Your account information is now up to date.
                                    </p>
                                    <p>
                                        If you encountered any issues during this process or have any further questions, please don't hesitate to reach out to our support team. We're here to help.
                                    </p>
                                    <p>
                                        Thank you for choosing SoftingArt.
                                    </p>
                                    <p class="mt-4 mb-2"><b>Happy learning,</b></p>
                                    <p>SoftingArt Team</p>
                                </div>
                            </div>
                        </body>
                        </html>`;
                        mailer.sendmail("contact@softingart.com", req.body.email, "SoftingArt - profile updated", html);

                        resp.send({ status: "updated" });
                    }
                })
            } else {
                resp.send({ status: "not matched" });
            }
        }
    })
})

router.post("/admin-update", (req, resp) => {
    connection.query(`UPDATE user SET email='${req.body.email}',name='${req.body.name}',phone='${req.body.phone}', role='${req.body.role}' WHERE id="${req.body.id}"`, (err, data) => {
        if (err) {
            resp.send({ status: "error" });
        } else {
            resp.send({ status: "updated" });
        }
    })
})

router.get("/get-users/id/:id", (req, resp) => {
    connection.query("SELECT `name`, `email`, `phone`, `desc`, `socials`, `image`, `role` FROM `user` WHERE id = '" + req.params.id + "' ORDER BY date DESC", (err, data) => {
        if (err) {
            resp.send({ status: "failed" })
        } else {
            resp.send({ status: data });
        }
    })
})

router.post("/update/id/:id", (req, resp) => {
    connection.query("UPDATE user SET name='" + req.body.name + "',email='" + req.body.email + "',phone='" + req.body.phone + "',role='" + req.body.role + "' WHERE  id = '" + req.params.id + "'", (err, data) => {
        if (err) {
            console.log(err);
            resp.send({ status: "failed" })
        } else {
            resp.send({ status: "success" });
        }
    })
})

router.get("/get-users/mentor", (req, resp) => {
    connection.query("SELECT `id`, `name`, `email`, `phone`, `desc`, `socials`, `image`, `role` FROM `user` WHERE ((`role` = 'mentor') OR (`role` = 'admin')) AND (`verify` = '1') ORDER BY date DESC", (err, data) => {
        if (err) {
            resp.send({ status: "failed" })
        } else {
            var stringData = [];
            data.map(ele => stringData.push({ id: ele.id, name: ele.name, email: ele.email, desc: ele.desc, image: ele.image, phone: ele.phone, role: ele.role, socials: JSON.parse(ele.socials) }))
            resp.send({ status: stringData });
        }
    })
})

router.get("/get-users/student", (req, resp) => {
    connection.query("SELECT `id`, `name`, `email`, `phone`, `desc`, `socials`, `image`, `role` FROM `user` WHERE `role` = 'student' AND `verify` = '1' ORDER BY date DESC", (err, data) => {
        if (err) {
            resp.send({ status: "failed" })
        } else {
            var stringData = [];
            data.map(ele => stringData.push({ id: ele.id, name: ele.name, email: ele.email, desc: ele.desc, image: ele.image, phone: ele.phone, role: ele.role, socials: JSON.parse(ele.socials) }))
            resp.send({ status: stringData });
        }
    })
})

router.get("/get-users/student/search/:result", (req, resp) => {
    connection.query("SELECT `id`, `name`, `email`, `phone`, `socials`, `desc`, `image`, `role` FROM `user` WHERE (`role` = 'student' AND `verify` = '1') && (`email` LIKE '%" + req.params.result + "%' OR `name` LIKE '%" + req.params.result + "%') ORDER BY date DESC", (err, data) => {
        if (err) {
            resp.send({ status: "failed" })
        } else {
            var stringData = [];
            data.map(ele => stringData.push({ id: ele.id, name: ele.name, email: ele.email, desc: ele.desc, image: ele.image, phone: ele.phone, role: ele.role, socials: JSON.parse(ele.socials) }))

            resp.send({ status: stringData });
        }
    })
})

router.get("/get-users/mentor/search/:result", (req, resp) => {
    connection.query("SELECT `id`, `name`, `email`, `phone`, `socials`, `desc`, `image`, `role` FROM `user` WHERE (`role` = 'mentor' AND `verify` = '1') && (`email` LIKE '%" + req.params.result + "%' OR `name` LIKE '%" + req.params.result + "%') ORDER BY date DESC", (err, data) => {
        if (err) {
            resp.send({ status: "failed" })
        } else {
            var stringData = [];
            data.map(ele => stringData.push({ id: ele.id, name: ele.name, email: ele.email, desc: ele.desc, image: ele.image, phone: ele.phone, role: ele.role, socials: JSON.parse(ele.socials) }))

            resp.send({ status: stringData });
            stringData = [];
        }
    })
})

router.post("/profile/pic/upload", (req, resp) => {
    const imgName = req.body.file_name;
    fileUpload.upload(req.files.file, "files/images/" + imgName);
    connection.query(`UPDATE user SET image='${imgName}' WHERE email = '${req.body.email}'`, (err, data) => {
        if (!err) {
            resp.send({ status: "success" })
        } else {
            resp.send({ status: "failed" })
        }
    })
})

router.post("/student/search", (req, resp) => {
    connection.query("SELECT `name`, `email`, `phone`, `desc`, `image`, `description`, `socials` FROM `user` WHERE (`role` = 'student' AND `verify` = '1') && (`email` LIKE '%" + req.body.result + "%' OR `name` LIKE '%" + req.body.result + "%') ORDER BY date DESC", (err, data) => {
        if (!err) {
            var stringData = [];
            data.map(ele => stringData.push({ name: ele.name, email: ele.email, desc: ele.desc, image: ele.image, phone: ele.phone, description: ele.description, socials: JSON.parse(ele.socials) }))

            resp.send({ status: stringData });
            stringData = [];
        }
    })
})

router.post("/mentor/search", (req, resp) => {
    connection.query("SELECT `name`, `email`, `phone`, `desc`, `image`, `description`, `socials` FROM `user` WHERE ((`role` = 'mentor' AND `verify` = '1') OR (`role` = 'admin')) && (`email` LIKE '%" + req.body.result + "%' OR `name` LIKE '%" + req.body.result + "%') ORDER BY date DESC", (err, data) => {
        if (!err) {
            var stringData = [];
            data.map(ele => stringData.push({ name: ele.name, email: ele.email, desc: ele.desc, image: ele.image, phone: ele.phone, description: ele.description, socials: JSON.parse(ele.socials) }))

            resp.send({ status: stringData });
            stringData = [];
        }
    })
})

router.get("/all/search/:email", (req, resp) => {
    connection.query("SELECT `name`, `email`, `phone`, `desc`, `image`, `description`, `socials` FROM `user` WHERE `email` = '" + req.params.email + "' AND `verify` = '1' ORDER BY date DESC", (err, data) => {
        if (!err) {
            var stringData = [];
            data.map(ele => stringData.push({ name: ele.name, email: ele.email, desc: ele.desc, image: ele.image, phone: ele.phone, description: ele.description, socials: JSON.parse(ele.socials) }))

            resp.send({ status: stringData });
            stringData = [];
        }
    })
})

module.exports = router;