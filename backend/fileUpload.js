const uploader = require("express-fileupload");

const upload = (file, where) => file.mv(where, err => true);

module.exports = { upload, uploader };