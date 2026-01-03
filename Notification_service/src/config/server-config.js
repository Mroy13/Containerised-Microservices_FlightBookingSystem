const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT: process.env.PORT,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_APP_PASSWORD:process.env.MAIL_APP_PASSWORD,
    amqp_url: process.env.AMQP_URL,
    QUEUE_NAME:process.env.QUEUE_NAME
}