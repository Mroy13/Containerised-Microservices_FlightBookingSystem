const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.AMQP_URL);
module.exports = {
    PORT: process.env.PORT,
    host_port: process.env.HOST_PORT,
    amqp_url: process.env.AMQP_URL,
    QUEUE_NAME:process.env.QUEUE_NAME
}