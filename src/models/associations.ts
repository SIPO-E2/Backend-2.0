// associations.ts
import { UserModel, ClientModel } from './index';

const {User} = UserModel;
const {Client} = ClientModel

export function establishRelations(): void {
  User.hasMany(Client, {
    sourceKey: 'id',
    foreignKey: 'user_id',
    as: 'clients'
  });

  Client.belongsTo(User, {
    targetKey: 'id',
    foreignKey: 'user_id',
    as: 'user'
  });
}
