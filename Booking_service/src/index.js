const express = require('express');
const routes = require('./routes');
const { ServerConfig, queueConfig } = require('./config');
const CRON_JOBS = require('./utils/common/cron_jobs');

let server;
let isShuttingDown = false;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
//app.use('/bookingservice/api',routes);

async function startServer() {
  try {
    await queueConfig.connectQueue();
    //CRON_JOBS();
    server = app.listen(ServerConfig.PORT, () => {
      console.log(`Server running on port ${ServerConfig.PORT}`);
    });
  }
  catch (err) {
    console.log("Startup failed:", err)
  }
}

async function shutdown() {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log('Shutting down...');

  try {
    await queueConfig.closeQueue();
  } catch (err) {
    console.error('Error closing queue', err);
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