// 이메일 접속 정보
var nodemailer = require('nodemailer');

const config = {
    mailer: {
        user: 'moodiary.official@gmail.com',
        password: 'moodiary123!'
    }
}

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: config.mailer.user,  
      pass: config.mailer.password   
    }
  });

module.exports = transporter;