import { Sequelize } from 'sequelize';
import {UserModel, ClientModel} from '../models';
import { establishRelations } from '../models/associations';

const {initializeUser} = UserModel;
const {initializeClient} = ClientModel;

// Replace the following with database connection string
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

initializeUser(sequelize);
initializeClient(sequelize);

establishRelations();

export default sequelize;
