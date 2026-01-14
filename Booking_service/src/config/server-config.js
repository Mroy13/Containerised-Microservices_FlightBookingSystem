const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT: process.env.PORT,
    host_port: process.env.HOST_PORT,
    amqp_url: process.env.AMQP_URL,
    QUEUE_NAME:process.env.QUEUE_NAME
}