import dotenv from 'dotenv'
import mysql, { Pool } from 'mysql2/promise'
dotenv.config()

class DatabaseConnection {
  conn(): Pool {
    return mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: 3306,
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 1000 * 60,
      queueLimit: 0,
    })
  }

  async retrive(prepareQuery: string, params: string | number[]) {
    const dbConn = await this.conn().getConnection()
    try {
      const [result] = await dbConn.query(prepareQuery, params)
      return result
    } catch (e) {
      console.log(e)
    } finally {
      dbConn.release()
    }
  }

  async retirveMapper(prepareQuery: string, params: string | number[]) {
    throw new Error('must be implementation')
  }
}

export const dbConn = new DatabaseConnection()
