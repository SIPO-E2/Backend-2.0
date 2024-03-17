import { Sequelize } from 'sequelize-typescript';
import {User} from '../models/user';
import {Client} from '../models/client';
import { Employee } from '../models/employee';
import dotenv from 'dotenv';
dotenv.config();

// Daniela
//  daniela Abelanda22

const connection = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: 'postgres',
  models: [User, Client, Employee],
  storage: ':memory:',
});

async function connect() {
  try {
    await connection.sync({alter: true});
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default connect;