const nodemailer = require('nodemailer');
const sendEmail= async (mailoptions)=>{
    let transporter=nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        requireTLS: true,
        auth:{
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    let info = await transporter.sendMail(mailoptions);
    console.log(`Message Sent : ${info.messageId}`);
}; 

module.exports=sendEmail;