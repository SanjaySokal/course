const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const uploader = require("express-fileupload");
const user = require("./routes/user");
const course = require("./routes/course");
const contact = require("./routes/contact");
const coupans = require("./routes/coupans");
const meeting = require("./routes/meeting");
const video = require("./routes/video");
const doubts = require("./routes/doubts");
const order = require("./routes/order");
const fileUpload = require("./fileUpload");

const app = express();
app.use(cors());
app.use(fileUpload.uploader());
app.use(bodyParser.json());
app.use("/user", user);
app.use("/course", course);
app.use("/contact", contact);
app.use("/coupans", coupans);
app.use("/meeting", meeting);
app.use("/video", video);
app.use("/doubts", doubts);
app.use("/order", order);
app.use("/", express.static("./"));

app.get("/", (req, resp) => {
    resp.send({ working: true });
})

app.listen(4000);