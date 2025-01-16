const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendMail = asyncHandler(async (data) => {
    const { email, html, subject } = data;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_NAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    let info = await transporter.sendMail({
        from: 'TokyoLife <no-reply@tokyolife.vn>',
        to: email,
        subject: subject,
        html: html
    });

    return info;
});

module.exports = sendMail;
