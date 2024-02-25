const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "course",
    dateStrings: true
})

// const connection = mysql.createConnection({
//     host: "148.113.8.8",
//     user: "softinga_sanjay",
//     password: "Sanjay@8295",
//     database: "softinga_course",
//     dateStrings: true
// })

module.exports = connection;