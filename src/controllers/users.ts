import { Request, Response } from "express";
// import { UserModel } from '../models';
import {UserAttributes} from '../models/user';

// const {User} = UserModel;

// mock data for testing User model
const mockData:UserAttributes[] = [
    { id: "1", name: 'User 1', email: 'user1@domain', password: '123456', role: 'admin', createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date(), activeDB: true },
    { id: "2", name: 'User 2', email: 'user2@domain', password: '123456', role: 'user', createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date(), activeDB: true },
    { id: "3", name: 'User 3', email: 'user3@domain', password: '123456', role: 'user', createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date(), activeDB: true },
    { id: "4", name: 'User 4', email: 'user4@domain', password: '123456', role: 'user', createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date(), activeDB: true },
    { id: "5", name: 'User 5', email: 'user5@domain', password: '123456', role: 'user', createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date(), activeDB: true },
];

// Getting users
export const getUsers = async(req: Request, res: Response) => {
    const { from = 0, to = 5 } = req.query;

    // mock data
    const users = mockData.slice(Number(from), Number(to));
    const all = 5;

    // DB
    // const users = await User.findAll({ offset: Number(from), limit: Number(to) });
    // const all = await User.count();
    res.json({ all, users });
}

// Getting a user
export const getUser = async(req: Request, res: Response) => {
    const { id } = req.params;

    // mock data
    const user = mockData.find(user => user.id === id);

    // DB
    // const user = await User.findByPk(id);
    res.json(user);
}

// Creating a user
export const postUser = async(req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    // mock data
    const user:UserAttributes = { id: "6", name, email, password, role, createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date(), activeDB: true };

    //DB
    // const user = await User.create({ name, email, password, role });
    res.json(user);
}

// Updating a user
export const putUser = async(req: Request, res: Response) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    // mock data
    const user = mockData.find(user => user.id === id);
    if(user) Object.assign(user, resto);

    // DB
    // const user = await User.update(resto, { where: { id } });
    res.json(user);
}

// Deleting a user (soft delete)
export const deleteUser = async(req: Request, res: Response) => {
    const { id } = req.params;

    // mock data
    const user = mockData.find(user => user.id === id);
    
    if(user) user.activeDB = false;

    // const user = await User.update({ activeDB: false }, { where: { id } });
    res.json(user);
}
