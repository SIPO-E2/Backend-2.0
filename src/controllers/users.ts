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

// Update an existing user
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, profileImage } = req.body;

  try {
    // Find the user by ID
    const user = await User.findByPk(id);

    // If the user does not exist, return a 404 error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user with the provided data
    await user.update({ name, email, password, profileImage });

    // Fetch the updated user including associated data
    const updatedUser = await User.findByPk(id, {
      include: [
        { model: Project, as: "projects" },
        { model: Client, as: "clients" },
        { model: Role, as: "roles" },
      ],
    });

    // Return a success response with the updated user
    return res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    // If an error occurs, return a 500 error with details
    return res.status(500).json({
      message: "Error updating user",
      error: error, // Changed to error.message for better error reporting
    });
  }
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
