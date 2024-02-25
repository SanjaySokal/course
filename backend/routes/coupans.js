var express = require("express");
var router = express.Router();
var connection = require("../connection");

router.post("/check", (req, resp) => {
    connection.query("SELECT `discount`, `courses` FROM `coupans` WHERE `code` = '" + req.body.code + "' AND active = '1'", (err, data) => {
        if (err) {
            resp.send({ status: "failed" })
        } else if (data.length > 0) {
            var newData = JSON.parse(data[0].courses);
            connection.query(`SELECT link FROM course WHERE id IN (${newData}) AND link = "${req.body.link}"`, (err2, data2) => {
                if (err2) {
                    resp.send({ status: "failed" })
                } else if (data2.length > 0) {
                    resp.send({ status: data[0].discount });
                } else {
                    resp.send({ status: "failed" })
                }
            })
        } else {
            resp.send({ status: "failed" })
        }
    })
})

router.get("/courses", (req, resp) => {
    connection.query("SELECT id, name FROM 	course ORDER BY date DESC", (err, data) => {
        if (!err) {
            resp.send({ status: data })
        } else {
            resp.send({ status: "failed" })
        }
    })
})

router.post("/add", (req, resp) => {
    connection.query(`SELECT id FROM coupans WHERE code = "${req.body.code}"`, (err2, data2) => {
        if (data2.length > 0) {
            resp.send({ status: "exist" })
        } else if (err2) {
            resp.send({ status: "failed" })
        } else {
            connection.query(`INSERT INTO coupans (courses, code, discount, active) VALUES ('[${req.body.courses}]','${req.body.code}','${req.body.discount}', '1')`, (err, data) => {
                if (!err) {
                    resp.send({ status: "success" })
                } else {
                    resp.send({ status: "failed" })
                }
            })
        }
    })
})

router.get("/all", (req, resp) => {
    connection.query("SELECT * FROM `coupans` ORDER BY date DESC", (err, data) => {
        resp.send({ status: data })
    })
})

router.get("/update/status/:status", (req, resp) => {
    connection.query(`UPDATE coupans SET active='0' WHERE id = '${req.params.status}'`, (err, data) => {
        if (!err) {
            resp.send({ status: "success" })
        }
    })
})

module.exports = router;