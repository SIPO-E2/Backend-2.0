import { Request, Response } from "express";
import { Client } from "../models";
import { User } from "../models";
import { Project } from "../models";
import { Employee } from "../models";
import { ClientCreationAttributes } from "../models/client";
import { Op } from "sequelize";

export const getClients = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 12;
  const offset = (page - 1) * limit;
  const { name, division, highGrowth } = req.query;

  const whereClause: { [key: string]: any } = {};
  if (typeof name === "string" && name !== "") {
    whereClause.name = { [Op.like]: `%${name}%` };
  }
  if (typeof division === "string" && division !== "") {
    whereClause.division = division;
  }
  if (typeof highGrowth === "string") {
    whereClause.high_growth = highGrowth === "true"; // Ensuring that the value is a boolean
  }

  try {
    const clients = await Client.findAll({
      where: whereClause,
      include: [
        { model: User, as: "owner_user" },
        { model: Project, as: "projects" },
      ],
      limit,
      offset,
    });
    const totalClients = await Client.count({ where: whereClause });

    res.json({
      status: "success",
      message: "Clients found",
      data: clients,
      total: totalClients,
    });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({
      status: "error",
      message: "Error fetching clients",
      error: error,
    });
  }
};

// Getting a client
export const getClientById = async (req: Request, res: Response) => {
  const { id } = req.params;

  // DB
  await Client.findByPk(id, {
    include: [
      { model: User, as: "owner_user" },
      { model: Project, as: "projects" },
    ],
  })
    .then((client) => {
      res.json({
        status: "success",
        message: "Client found",
        data: client,
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "Client not found",
        error: e,
      });
    });
};

// Creating a client
export const postClient = async (req: Request, res: Response) => {
  const {
    name,
    owner_user_id,
    division,
    additionalDetails,
    high_growth,
    imageURL,
    contractFile,
    joiningDate,
    experience,
    money,
  }: ClientCreationAttributes = req.body;

  // if user not found return error because the relationship is required
  const user = await User.findByPk(owner_user_id);
  if (!user) {
    res.json({
      status: "error",
      message: " User of Client not found",
    });
    return;
  }

  await Client.create(
    {
      name,
      owner_user_id,
      division,
      additionalDetails,
      high_growth,
      imageURL,
      contractFile,
      joiningDate,
      experience,
      money,
    },
    {
      include: [
        { model: User, as: "owner_user" },
        { model: Project, as: "projects" },
      ],
    }
  )
    .then(async (client) => {
      const clientWithAssociations = await Client.findByPk(client.id, {
        include: [
          { model: User, as: "owner_user" },
          { model: Project, as: "projects" },
        ],
      });
      res.json({
        status: "success",
        message: "Client created",
        data: clientWithAssociations,
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "Client not created",
        error: e,
      });
    });
};

// Updating a clientt
export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...resto } = req.body;

  // // dont update user_id
  // delete resto.user_id;

  await Client.update(resto, { where: { id } })
    .then(async () => {
      const updatedClient = await Client.findByPk(id, {
        include: [
          { model: User, as: "owner_user" },
          { model: Project, as: "projects" },
        ],
      });
      res.json({
        status: "success",
        message: "Client updated",
        data: updatedClient,
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "Client not updated",
        error: e,
      });
    });
};

//Delete a client(soft delete)
export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;

  await Client.update({ activeDB: false }, { where: { id } })
    .then(() => {
      res.json({
        status: "success",
        message: "Client deleted",
        data: {
          id,
        },
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "Client not deleted",
        error: e,
      });
    });
};
