const nodemailer = require('nodemailer');


const sendEmail = async (options) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        }
    });
    const mailOption = {
        from: 'Omar Khaled <omar96136khalid@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    await transport.sendMail(mailOption);
}
module.exports = sendEmail;