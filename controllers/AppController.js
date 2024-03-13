/**
 * an object called AppController that is responsible for handling
 * the status and stats endpoints
 */
import redisClient from "../utils/redis";
import dbClient from '../utils/db'

class AppController {
    /**
   * should return if Redis is alive and if the DB is alive too
   * { "redis": true, "db": true } with a status code 200
   */
    static getStatus(request, response) {
      response.status(200).json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
    }
  
    static async getStats(request, response) {
      const usersNum = await dbClient.nbUsers();
      const filesNum = await dbClient.nbFiles();
      response.status(200).json({ users: usersNum, files: filesNum });
    }
  }

module.exports = AppController;
