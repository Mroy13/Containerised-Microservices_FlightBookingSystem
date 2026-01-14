const Redis = require('redis');
const ServerConfig = require('./server-config');
const redisClient = Redis.createClient({
    url: `redis://${ServerConfig.REDIS_HOST || 'redis'}:${ServerConfig.REDIS_PORT || 6379}`
});

const connectRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
};

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

redisClient.on('ready', () => {
  console.log('Redis Client Ready');
});

const shutdown = async () => {
    if (redisClient.isOpen) await redisClient.quit();
    process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

(async () => {
    await connectRedis();
})();

module.exports = redisClient;