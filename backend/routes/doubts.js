var express = require("express");
var router = express.Router();
var connection = require("../connection");

router.get("/all", (req, resp) => {
    connection.query("SELECT * FROM doubts ORDER BY date DESC", (err, data) => {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            arr.push({ id: data[i].id, name: data[i].name, read_by: data[i].read_by, data: JSON.parse(data[i].data) });
        }
        resp.send({ status: arr })
    })
})

router.get("/single/:id", (req, resp) => {
    connection.query("SELECT * FROM `doubts` WHERE id = '" + req.params.id + "' ORDER BY date DESC", (err, data) => {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            arr.push({ name: data[i].name, read_by: data[i].read_by, data: JSON.parse(data[i].data) })
        }
        resp.send({ status: arr });
    })
})

router.post("/add", (req, resp) => {
    connection.query(`INSERT INTO doubts(name, data, read_by) VALUES ('${req.body.name}','${JSON.stringify(req.body.data)}','${req.body.read_by}')`, (err, data) => {
        if (!err) {
            resp.send({ status: "success" });
        } else {
            console.log(err);
        }
    })
})

router.post("/update", (req, resp) => {
    connection.query(`UPDATE doubts SET data='${JSON.stringify(req.body.data)}',read_by='${req.body.read_by}' WHERE id = '${req.body.id}'`, (err, data) => {
        if (!err) {
            resp.send({ status: "success" });
        } else {
            console.log(err);
        }
    })
})

router.post("/search", (req, resp) => {
    connection.query("SELECT * FROM doubts WHERE name LIKE '%" + req.body.search + "%' ORDER BY date DESC", (err, data) => {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            arr.push({ name: data[i].name, read_by: data[i].read_by, data: JSON.parse(data[i].data) })
        }
        resp.send({ status: arr });
    })
})

module.exports = router;