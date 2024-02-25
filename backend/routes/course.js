var express = require("express");
var router = express.Router();
var connection = require("../connection");
var mailer = require("../mailer");
var fileUpload = require("../fileUpload");

router.get("/all", (req, resp) => {
    connection.query("SELECT `name`, `price`, `description`, `image`, `link`, `instructor`, `duration`, `access`, `language` FROM `course` ORDER BY date DESC", (err, data) => {
        resp.send({ status: data })
    })
})

router.get("/all/user", (req, resp) => {
    connection.query("SELECT `course`.`name` AS `course_name`,`course`.`id` AS `course_id`, `course`.`price`, `course`.`description` AS `course_description`, `course`.`image` AS `course_img`, `course`.`link`, `course`.`duration`, `course`.`access`, `course`.`language`, `course`.`tech`, `user`.`name`, `user`.`image` AS `user_img`, `user`.`description`, `user`.`desc` FROM `course` INNER JOIN `user` ON `course`.`instructor` = `user`.`id` ORDER BY course.date DESC", (err, data) => {
        resp.send({ status: data })
    })
})

router.get("/single/:name", (req, resp) => {
    connection.query("SELECT `course`.`name` AS `course_name`,`course`.`id` AS `course_id`, `course`.`price`, `course`.`description` AS `course_description`, `course`.`image` AS `course_img`, `course`.`link`, `course`.`duration`, `course`.`access`, `course`.`language`, `course`.`instructor`, `course`.`tech`, `user`.`name`, `user`.`id`, `user`.`image` AS `user_img`, `user`.`description`, `user`.`desc` FROM `course` INNER JOIN `user` ON `user`.`id` = `course`.`instructor` WHERE `course`.`link` = '" + req.params.name + "' ORDER BY course.date DESC", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            resp.send({ status: data });
        }
    })
})

router.get("/search/:name", (req, resp) => {
    connection.query("SELECT `course`.`name` AS `course_name`,`course`.`id` AS `course_id`, `course`.`price`, `course`.`description` AS `course_description`, `course`.`image` AS `course_img`, `course`.`link`, `course`.`duration`, `course`.`access`, `course`.`language`, `course`.`tech`, `user`.`name`, `user`.`image` AS `user_img`, `user`.`description`, `user`.`desc` FROM `course` INNER JOIN `user` ON `course`.`instructor` = `user`.`id` WHERE `course`.`name` LIKE '%" + req.params.name + "%' OR `course`.`tech` LIKE '%" + req.params.name + "%' ORDER BY course.date DESC", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            resp.send({ status: data })
        }
    })
})

router.post("/update", (req, resp) => {
    connection.query('UPDATE `course` SET `name`="' + req.body.name + '",`price`="' + req.body.price + '",`description`="' + req.body.description + '", `link`="' + req.body.link + '",`instructor`="' + req.body.instructor + '",`duration`="' + req.body.duration + '",`access`="' + req.body.access + '",`language`="' + req.body.languages + '" WHERE `course`.`id` = "' + req.body.course_id + '"', (err, data) => {
        if (!err) {
            resp.send({ status: "success" })
        } else {
            console.log(err);
            resp.send({ status: "failed" })
        }
    })
})

router.post("/update/image", (req, resp) => {
    const imgName = req.body.file_name;
    fileUpload.upload(req.files.file, "files/images/" + imgName);
    connection.query('UPDATE `course` SET `image`="' + imgName + '" WHERE `course`.`id` = "' + req.body.course_id + '"', (err, data) => {
        if (!err) {
            resp.send({ status: "success" })
        } else {
            console.log(err);
            resp.send({ status: "failed" })
        }
    })
})

router.post("/user/single", (req, resp) => {
    connection.query("SELECT course.image AS course_image, course.name AS course_name, course.link, course.price, course.duration, user.name, user.desc FROM `orders` INNER JOIN course ON orders.course = course.id INNER JOIN user ON orders.user = user.id WHERE orders.payment_status = 'done' AND user.email = '" + req.body.email + "' ORDER BY orders.date DESC", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            resp.send({ status: data })
        }
    })
})

router.post("/user/single/link", (req, resp) => {
    connection.query("SELECT course.image AS course_image, course.name AS course_name, course.link, course.price, course.duration, user.name, user.desc FROM `orders` INNER JOIN course ON orders.course = course.id INNER JOIN user ON orders.user = user.id WHERE orders.payment_status = 'done' AND user.email = '" + req.body.email + "' AND course.link = '" + req.body.link + "' ORDER BY orders.date DESC", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            resp.send({ status: data })
        }
    })
})

router.post("/add/new", (req, resp) => {
    const imgName = req.body.file_name;
    let link = req.body.name.toLowerCase().replaceAll(" ", "-");
    connection.query(`SELECT * FROM course WHERE link = '${link}'`, (err2, data2) => {
        if (!err2) {
            if (data2.length > 0) {
                link = link + "-" + random;
            }
            fileUpload.upload(req.files.file, "files/images/" + imgName);
            connection.query("INSERT INTO `course`(`name`, `price`, `description`, `tech`, `image`, `link`, `instructor`, `duration`, `access`, `language`) VALUES ('" + req.body.name + "','" + req.body.price + "','" + req.body.description + "','" + req.body.tech + "','" + imgName + "','" + link + "','" + req.body.instructor + "','" + req.body.duration + "','" + req.body.access + "','" + req.body.languages + "')", (err, data) => {
                if (!err) {
                    resp.send({ status: "success" })
                } else {
                    console.log(err);
                    resp.send({ status: "failed" })
                }
            })
        } else {
            resp.send({ status: "failed" })
        }
    })
})

router.get("/get/course/name/:link", (req, resp) => {
    connection.query(`SELECT name FROM course WHERE link = '${req.params.link}'`, (err, data) => {
        resp.send({ status: data })
    })
})

module.exports = router;