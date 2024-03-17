import { Sequelize } from 'sequelize-typescript';
import {User} from '../models/user';
import {Client} from '../models/client';

const connection = new Sequelize({
  database: "sipo",
  username: "daniela",
  password: "Abelenda22",
  host: "localhost",
  port: 5432,
  dialect: 'postgres',
  models: [User, Client],
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