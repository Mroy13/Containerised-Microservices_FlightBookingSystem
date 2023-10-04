const TRANSPORT = require('../config/email-config');
const { StatusCodes } = require('http-status-codes');
//const {Repository}=require('../repositories');
const Apperror = require('../utils/error/App-error');

//const Repository=new Repository();

async function sendEmail(adminEmail,recipientEmail,subject,text) {
    try {
        const res = await TRANSPORT.sendMail({
            from: adminEmail ,
            to: recipientEmail,
            subject: subject,
            text: text

        });
        //console.log(res);
        return res;
} catch (error) {
   console.log(error);
   throw error;
}
}


module.exports = {
  sendEmail
}