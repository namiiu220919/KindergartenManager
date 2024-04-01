var nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"namiiu2209@gmail.com",//email gửi đi
        pass:"xgpd rumq halc ognv",//mật khẩu email gửi
    },
});

module.exports = transporter;