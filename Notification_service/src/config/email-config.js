const nodemailer=require('nodemailer');
const transport=nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_APP_PASSWORD,
        }
      });
module.exports=transport;