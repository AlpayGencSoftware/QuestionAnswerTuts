const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'gencoalpay@gmail.com',
        pass: '1982gncAD!!1kFaXPass!12Ps13Da46s5566!uc'
    },
    tls: {
        rejectUnauthorized: false
    }
});

let mailOptions = {
    from: 'gencoalpay@gmail.com',
    to: 'gencoalpay@gmail.com',
    subject: 'Test',
    text: 'Hello World!'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error.message);
    }
    console.log('success');
});