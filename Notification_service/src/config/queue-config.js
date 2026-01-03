const amqplib = require('amqplib');
const  ServerConfig = require('./server-config');
const { emailService } = require('../services');

let connection;
let channel;

async function startConsumer() {
	try {
		connection = await amqplib.connect(ServerConfig.amqp_url);

		connection.on('close', () => {
			console.error('RabbitMQ connection closed');
			process.exit(1);
		});

		channel = await connection.createChannel();

		await channel.assertQueue(ServerConfig.QUEUE_NAME, {
			durable: true
		});

		channel.prefetch(5);

		channel.consume(ServerConfig.QUEUE_NAME, handleMessage);
	} catch (err) {
		console.error('Failed to start consumer', err);
		throw err;
	}
}

async function handleMessage(msg) {
	if (!msg) return;

	try {
		const payload = JSON.parse(msg.content.toString());

		await emailService.sendEmail(
			ServerConfig.MAIL_USERNAME,
			payload.recipientEmail,
			payload.subject,
			payload.message
		);

		channel.ack(msg);
	} catch (err) {
		console.error('Message processing failed', err);
		//channel.nack(msg, false, false);
	}
}

async function stopConsumer() {
	if (channel) await channel.close();
	if (connection) await connection.close();
}

module.exports = {
	startConsumer,
	stopConsumer
};
