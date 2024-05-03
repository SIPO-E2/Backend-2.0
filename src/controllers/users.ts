import { Request, Response } from "express";
import { Role, User } from "../models";
import { UserCreationAttributes } from "../models/user";
import { Project } from "../models";
import { Client } from "../models";
import { Op } from "sequelize";

// Getting users
export const getUsers = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 12;
  const offset = (page - 1) * limit;
  const { name, activeDB } = req.query;

  const whereClause: { [key: string]: any } = {};

  if (name) {
    whereClause.name = { [Op.like]: `%${name}%` };
  }
  if (activeDB !== undefined) {
    whereClause.activeDB = activeDB === "true";
  }

  try {
    const users = await User.findAll({
      where: whereClause,
      include: [
        { model: Project, as: "projects" },
        { model: Client, as: "clients" },
        { model: Role, as: "roles" },
      ],
      limit,
      offset,
    });
    const totalUsers = await User.count({ where: whereClause });

    res.json({
      status: "success",
      message: "Users found",
      data: users,
      total: totalUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      status: "error",
      message: "Error fetching users",
      error: error,
    });
  }
};

// Getting a user
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  // DB
  await User.findByPk(id, {
    include: [
      { model: Project, as: "projects" },
      { model: Client, as: "clients" },
      { model: Role, as: "roles" },
    ],
  })
    .then((user) => {
      res.json({
        status: "success",
        message: "User found",
        data: user,
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "User not found",
        error: e,
      });
    });
};

// Creating a user
export const postUser = async (req: Request, res: Response) => {
  const { name, email, password, profileImage }: UserCreationAttributes =
    req.body;

  await User.create(
    { name, email, password, profileImage },
    {
      include: [
        { model: Project, as: "projects" },
        { model: Client, as: "clients" },
        { model: Role, as: "roles" },
      ],
    }
  )

    .then(async (user) => {
      const userWithAssociations = await User.findByPk(user.id, {
        include: [
          { model: Project, as: "projects" },
          { model: Client, as: "clients" },
          { model: Role, as: "roles" },
        ],
      });

      res.json({
        status: "success",
        message: "User created",
        data: userWithAssociations,
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "User not created",
        error: e,
      });
    });
};

// Updating a user
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...resto } = req.body;

  await User.update(resto, { where: { id } })
    .then(async () => {
      const updatedUser = await User.findByPk(id, {
        include: [
          { model: Project, as: "projects" },
          { model: Client, as: "clients" },
          { model: Role, as: "roles" },
        ],
      });
      res.json({
        status: "success",
        message: "User updated",
        data: updatedUser,
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "User not updated",
        error: e,
      });
    });
};

// Deleting a user (soft delete)
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  await User.update({ activeDB: false }, { where: { id } })
    .then(() => {
      res.json({
        status: "success",
        message: "User deleted",
        data: {
          id,
        },
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "User not deleted",
        error: e,
      });
    });
};
