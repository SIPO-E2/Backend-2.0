// import { Request, Response } from "express";
// import { ClientCreationAttributes } from '../models';
// import { mockDataUser } from "./users";

// // include getall include model, attributes.
// // status, message, data, error

// const mockDataUserModel = mockDataUser.map(user => {
//     return { name: user.name, email: user.email, role: user.role, activeDB: user.activeDB, createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date() };
// }



// // mock data for testing Client model
// const mockData: ClientCreationAttributes[] = [
//     { name: 'Client 1', user_id: '1', user: mockDataUserModel[0] ,division: 'Division 1', details: 'Details 1', high_growth: true, image: 'http://example.com/image1' , activeDB: true},
//     { name: 'Client 2', user_id: '2', user: mockDataUser[1]  ,division: 'Division 2', details: 'Details 2', high_growth: false, image: 'http://example.com/image2', activeDB: true },
//     { name: 'Client 3', user_id: '3', user: mockDataUser[2]  ,division: 'Division 3', details: 'Details 3', high_growth: true, image: 'http://example.com/image3', activeDB: true },
//     { name: 'Client 4', user_id: '4', user: mockDataUser[3]  ,division: 'Division 4', details: 'Details 4', high_growth: false, image: 'http://example.com/image4', activeDB: true },
//     { name: 'Client 5', user_id: '5', user: mockDataUser[4]  ,division: 'Division 5', details: 'Details 5', high_growth: true, image: 'http://example.com/image5', activeDB: true},
// ];

// // Getting clients
// export const getClients = async(req: Request, res: Response) => {
//     const { from = 0, to = 5 } = req.query;

//     // mock data
//     const clients = mockData.slice(Number(from), Number(to));
//     const all = mockData.length;

//     res.json({ all, clients });
// }

// // Getting a client
// export const getClient = async(req: Request, res: Response) => {
//     const { id } = req.params;

//     // mock data
//     const client = mockData.find(client => client.id === id);

//     res.json(client);
// }

// // Creating a client
// export const postClient = async(req: Request, res: Response) => {
//     const { name, user_id, division, details, high_growth, image } = req.body;

//     // mock data
//     const client: Client = { id: "newid", name, user_id, division, details, high_growth, image: new URL(image), createdAt: new Date(), updatedAt: new Date(), deletedAt: new Date(), activeDB: true };
//     mockData.push(client);

//     res.json(client);
// }

// // Updating a client
// export const putClient = async(req: Request, res: Response) => {
//     const { id } = req.params;
//     const { ...resto } = req.body;

//     // mock data
//     const client = mockData.find(client => client.id === id);
//     if(client) Object.assign(client, resto);

//     res.json(client);
// }

// // Deleting a client (soft delete)
// export const deleteClient = async(req: Request, res: Response) => {
//     const { id } = req.params;

//     // mock data
//     const client = mockData.find(client => client.id === id);
    
//     if(client) client.activeDB = false;

//     res.json(client);
// }
