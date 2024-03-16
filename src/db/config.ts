import { Sequelize } from 'sequelize-typescript';
import {UserModel, ClientModel} from '../models';



const connection = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: 'postgres',
  models: [UserModel, ClientModel],
  storage: ':memory:',
  logging: false
});

async function connect() {
  try {
    await connection.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default connection;

// const {initializeUser} = UserModel;
// const {initializeClient} = ClientModel;

// // Replace the following with database connection string
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'postgres',
// });

// initializeUser(sequelize);
// initializeClient(sequelize);

// establishRelations();

// export default sequelize;



// alter: true

