import mysql from 'mysql'
import databaseConfig from '../configs/database'

export const db = mysql.createConnection(databaseConfig)