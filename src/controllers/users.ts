// import { Request, Response } from "express";
// // import { UserModel } from '../models';
// import {UserCreationAttributes} from '../models/user';

// // const {User} = UserModel;

// // mock data for testing User model
// export const mockDataUser:UserCreationAttributes[] = [
//     { name: 'User 1', email: 'user1@domain', password: '123456', role: 'admin',activeDB: true },
//     { name: 'User 2', email: 'user2@domain', password: '123456', role: 'user', activeDB: true },
//     { name: 'User 3', email: 'user3@domain', password: '123456', role: 'user', activeDB: true },
//     { name: 'User 4', email: 'user4@domain', password: '123456', role: 'user', activeDB: true },
//     { name: 'User 5', email: 'user5@domain', password: '123456', role: 'user', activeDB: true },
// ];

// // Getting users
// export const getUsers = async(req: Request, res: Response) => {
//     const { from = 0, to = 5 } = req.query;

//     // mock data
//     const users = mockDataUser.slice(Number(from), Number(to));
//     const all = 5;

//     // DB
//     // const users = await User.findAll({ offset: Number(from), limit: Number(to) });
//     // const all = await User.count();
//     res.json({ all, users });
// }

// // Getting a user
// export const getUser = async(req: Request, res: Response) => {
//     const { id } = req.params;

//     // mock data
//     const user = mockDataUser.find(user => user.id === id);

//     // DB
//     // const user = await User.findByPk(id);
//     res.json(user);
// }

// // Creating a user
// export const postUser = async(req: Request, res: Response) => {
//     const { name, email, password, role } = req.body;
    
//     // mock data
//     const user:UserCreationAttributes = { name, email, password, role, activeDB: true };

//     //DB
//     // const user = await User.create({ name, email, password, role });
//     res.json(user);
// }

// // Updating a user
// export const putUser = async(req: Request, res: Response) => {
//     const { id } = req.params;
//     const { ...resto } = req.body;

//     // mock data
//     const user = mockDataUser.find(user => user.id === id);
//     if(user) Object.assign(user, resto);

//     // DB
//     // const user = await User.update(resto, { where: { id } });
//     res.json(user);
// }

// // Deleting a user (soft delete)
// export const deleteUser = async(req: Request, res: Response) => {
//     const { id } = req.params;

//     // mock data
//     const user = mockDataUser.find(user => user.id === id);
    
//     if(user) user.activeDB = false;

//     // const user = await User.update({ activeDB: false }, { where: { id } });
//     res.json(user);
// }
