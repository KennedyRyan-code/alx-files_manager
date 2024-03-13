/* eslint-disable no-param-reassign */
import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
    constructor() {
        this.client = createClient();

        this.client.on('error', (error) => {
            console.log(`Redis client not connected to the server: ${error}`);
        });

        this.client.on('connect', () => {
            console.log('Redis client connected to the server');
        });
    }
    
    // Check if the client is connected to the server
    isAlive() {
        if (this.client.connected) {
            return true;
        }
        return false;
    }
    
    // gets value corresponding to key in redis
    async get(key) {
        const redisGet = promisify(this.client.get).bind(this.client);
        const value = await redisGet(key);
        return value;
    }
    
    // sets key to value in redis with a duration
    async set(key, value, duration) {
        const redisSet = promisify(this.client.set).bind(this.client);
        await redisSet(key, value);
        await this.client.expire(key, duration);
    }
    
    // Deletes key in redis service
    async del(key) {
        const redisDel = promisify(this.client.del).bind(this.client);
        await redisDel(key);
    }
}

const redisClient = new RedisClient();

module.exports = redisClient;
