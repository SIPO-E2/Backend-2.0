import { Request, Response } from "express";
import { Role } from "../models";
import { RoleCreationAttributes } from "../models/role";
import { User } from "../models";
import { Op } from "sequelize";

// Getting all roles
export const getRoles = async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    name = "",
    updatedStart = "",
    updatedEnd = "",
    activeDB,
  } = req.query;

  const offset = (Number(page) - 1) * Number(limit);

  // Build the where clause dynamically
  const updatedStartDate = updatedStart
    ? new Date(updatedStart.toString())
    : null;
  const updatedEndDate = updatedEnd ? new Date(updatedEnd.toString()) : null;

  const whereClause = {
    ...(name && { name: { [Op.like]: `%${name}%` } }),
    ...(updatedStartDate &&
      updatedEndDate && {
        updatedAt: {
          [Op.between]: [updatedStartDate, updatedEndDate],
        },
      }),
    ...(activeDB !== undefined && { activeDB: activeDB === "true" }), // Adding the activeDB filter
  };

  try {
    const roles = await Role.findAll({
      where: whereClause,
      offset: offset,
      limit: Number(limit),
      include: [{ model: User, as: "users" }],
      order: [["updatedAt", "DESC"]], // Order by last updated roles
    });

    res.json({
      status: "success",
      message: "Roles found",
      data: roles,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: await Role.count({ where: whereClause }),
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Roles not found",
      error: error,
    });
  }
};

// Getting a specific role by ID
export const getRole = async (req: Request, res: Response) => {
  const { id } = req.params;

  // DB
  await Role.findByPk(id, { include: [{ model: User, as: "users" }] })
    .then((role) => {
      res.json({
        status: "success",
        message: "Role found",
        data: role,
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "Role not found",
        error: e,
      });
    });
};

// Creating a new role
export const postRole = async (req: Request, res: Response) => {
  const { name }: RoleCreationAttributes = req.body;

  await Role.create({ name }, { include: [{ model: User, as: "users" }] })
    .then((role) => {
      res.json({
        status: "success",
        message: "Role created",
        data: role,
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "Role not created",
        error: e,
      });
    });
};

// Updating an existing role
export const updateRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...resto } = req.body;

  await Role.update(resto, { where: { id } })
    .then(async () => {
      const updatedRole = await Role.findByPk(id, {
        include: [{ model: User, as: "users" }],
      });
      res.json({
        status: "success",
        message: "Role updated",
        data: updatedRole,
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "Role not updated",
        error: e,
      });
    });
};

// Deleting a role (soft delete)
export const deleteRole = async (req: Request, res: Response) => {
  const { id } = req.params;

  await Role.update({ activeDB: false }, { where: { id } })
    .then(() => {
      res.json({
        status: "success",
        message: "Role deleted",
        data: {
          id,
        },
      });
    })
    .catch((e) => {
      res.json({
        status: "error",
        message: "Role not deleted",
        error: e,
      });
    });
};
