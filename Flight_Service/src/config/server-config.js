const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT: process.env.PORT,
    REDIS_HOST:process.env.REDIS_HOST,
    REDIS_PORT:process.env.REDIS_PORT
}