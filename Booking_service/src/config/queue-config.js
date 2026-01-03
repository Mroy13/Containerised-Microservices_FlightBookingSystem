const amqplib = require('amqplib');
const ServerConfig = require('./server-config');
let channel, connection;

async function connectQueue() {
    try {
        connection = await amqplib.connect(ServerConfig.amqp_url);

        connection.on('error', err => {
            console.error('AMQP connection error', err);
        });

        connection.on('close', () => {
            console.error('AMQP connection closed. Reconnecting...');
            setTimeout(connectQueue, 5000);
        });

        channel = await connection.createConfirmChannel();

        await channel.assertQueue(ServerConfig.QUEUE_NAME, {
            durable: true
        });

        console.log('RabbitMQ connected');
    } catch (err) {
        console.error('RabbitMQ connection failed', err);
        setTimeout(connectQueue, 5000);
    }
}


async function sendData(data) {
    try {
        if (!channel) {
            throw new Error('RabbitMQ channel not initialized');
        }
        channel.sendToQueue(ServerConfig.QUEUE_NAME, Buffer.from(JSON.stringify(data)), { persistent: true });
    } catch (error) {
        console.log("queue-error:", error);
    }
}


async function closeQueue() {
  if (channel) await channel.close();
  if (connection) await connection.close();
}


module.exports = {
    connectQueue,
    sendData,
    closeQueue
}