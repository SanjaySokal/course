var express = require("express");
var router = express.Router();
var connection = require("../connection");
var mailer = require("../mailer");
var fileUpload = require("../fileUpload");

router.post("/upload", (req, resp) => {
    const img = req.files.img;
    const video = req.files.video;
    const body = req.body;
    let url = body.name.toLowerCase().replaceAll(" ", "-");
    url = url.replaceAll("//", "-");
    url = url.replaceAll("_", "-");
    url = url.replaceAll("/", "-");
    const random = Math.trunc(Math.random() * 1000000);
    connection.query(`SELECT url FROM videos WHERE url = '${url}'`, (err2, data2) => {
        if (!err2) {
            if (data2.length > 0) {
                url = url + "-" + random;
            }
        }
    })

    fileUpload.upload(img, "files/images/" + req.body.img_name);

    fileUpload.upload(video, "files/videos/" + req.body.vid_name);

    connection.query(`INSERT INTO videos(name, url, course, thumbnail, video, extra) VALUES ('${body.name}','${url}','${body.course}','${req.body.img_name}','${req.body.vid_name}','${body.attachments}')`, (err, data) => {
        if (!err) {
            resp.send({ status: "success" })
        } else {
            console.log(err);
            resp.send({ status: "failed" })
        }
    })
})

router.get("/course/:course", (req, resp) => {
    connection.query(`SELECT * FROM videos WHERE course = "${req.params.course}" ORDER BY date DESC`, (err, data) => {
        resp.send({ status: data })
    })
})

router.get("/search/:name/:course", (req, resp) => {
    connection.query(`SELECT * FROM videos WHERE name LIKE "%${req.params.name}%" AND course = "${req.params.course}" ORDER BY date DESC`, (err, data) => {
        resp.send({ status: data })
    })
})

router.get("/single/:link", (req, resp) => {
    connection.query(`SELECT * FROM videos WHERE url= '${req.params.link}'`, (err, data) => {
        resp.send({ status: data })
    })
})

router.post("/update/image", (req, resp) => {
    const imgName = req.body.file_name;
    fileUpload.upload(req.files.image, "files/images/" + imgName);
    connection.query(`UPDATE videos SET thumbnail='${imgName}' WHERE url = '${req.body.url}'`, (err, data) => {
        if (!err) {
            resp.send({ status: "success" });
        } else {
            resp.send({ status: "failed" });
        }
    })
})

router.post("/upate/video/details", (req, resp) => {
    connection.query(`UPDATE videos SET name='${req.body.name}', extra='${req.body.extra}' WHERE url = '${req.body.url}'`, (err, data) => {
        resp.send({ status: "success" });
    })
})

module.exports = router;