const express = require('express');
const amqplib = require('amqplib');
const routes = require('./routes');
const { ServerConfig } = require('./config');

const { startConsumer, stopConsumer } = require('./config/queue-config');

let server;
let shuttingDown = false;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

async function startServer() {
  try {
    await startConsumer();
    server = app.listen(ServerConfig.PORT, () => {
      console.log(`Server running on port ${ServerConfig.PORT}`);
    });
  } catch (err) {
    console.error('Startup failed', err);
    process.exit(1);
  }
}

async function shutdown() {
  if (shuttingDown) return;
  shuttingDown = true;

  console.log('Shutting down consumer service...');

  try {
    await stopConsumer();
  } catch (err) {
    console.error('Error during shutdown', err);
  }

  if (server) {
    server.close(() => process.exit(0));
  } else {
    process.exit(0);
  }
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

startServer();