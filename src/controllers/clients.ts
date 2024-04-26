import { Request, Response } from "express";
import { Client } from "../models";
import { User } from "../models";
import { Project } from "../models";
import { Employee } from "../models";
import { ClientCreationAttributes } from "../models/client";
import { Op } from "sequelize";
import { Division } from "../models/enums";

export const getClients = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 12;
  const offset = (page - 1) * limit;
  const { name, divisions, highGrowth, activeDB } = req.query;

  const whereClause: { [key: string]: any } = {};

  if (name) {
    whereClause.name = { [Op.like]: `%${name}%` };
  }
  if (divisions) {
    whereClause.divisions = { [Op.overlap]: [divisions] };
  }
  if (highGrowth !== undefined) {
    whereClause.high_growth = highGrowth === "true";
  }
  if (activeDB !== undefined) {
    whereClause.activeDB = activeDB === "true";
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
    divisions,
    additionalDetails,
    high_growth,
    imageURL,
    contractFile,
    joiningDate,
    experience,
    salary,
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
      divisions,
      additionalDetails,
      high_growth,
      imageURL,
      contractFile,
      joiningDate,
      experience,
      salary,
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

export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, divisions } = req.body;

  try {
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Asegúrate de que cada división proporcionada es válida antes de actualizar
    const validDivisions = divisions.every((division: Division) =>
      Object.values(Division).includes(division)
    );
    if (!validDivisions) {
      return res.status(400).json({ message: "Invalid division(s) provided" });
    }

    // Actualiza el cliente directamente con las nuevas divisiones
    await client.update({ name, divisions });

    return res.status(200).json({
      message: "Client updated successfully",
      data: client,
    });
  } catch (error) {
    console.error("Error updating client:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
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
