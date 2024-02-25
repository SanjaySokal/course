const mailer = require("nodemailer");

var trans = mailer.createTransport({
    service: "gmail",
    auth: {
        user: "softingart@gmail.com",
        pass: "cgml ltko yqnl lmut"
    }
})

function sendmail(from, to, subject, html) {
    var data = {
        from: from,
        to: to,
        subject: subject,
        html: html
    }

    trans.sendMail(data, err => {
        if (err) {
            console.log(err);
        }
    })
}

module.exports = { sendmail };