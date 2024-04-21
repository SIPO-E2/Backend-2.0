import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user";
import { Client } from "../models/client";
import { Project } from "../models/project";
import { JobPosition } from "../models/jobPosition";
import { Opening } from "../models/opening";
import { Employee } from "../models/employee";
import { Role } from "../models/role";
import { UserRole } from "../models/userRole";
import { EmployeeOpening } from "../models/employeeOpening";
import { Candidate } from "../models/candidate";
import { Person } from "../models/person";
import { Allocation } from "../models/allocation";
import { Interview } from "../models/interview";
import { Pipeline } from "../models/pipeline";
import { Bench } from "../models/bench";
import { Billing } from "../models/billing";
import dotenv from "dotenv";
dotenv.config();

const connection = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: "postgres",
  models: [
    User,
    Client,
    Project,
    JobPosition,
    Opening,
    Employee,
    Role,
    UserRole,
    EmployeeOpening,
    Candidate,
    Person,
    Allocation,
    Interview,
    Pipeline,
    Bench,
    Billing,
  ],
  storage: ":memory:",
});

async function connect() {
  try {
    await connection.sync({ alter: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export default connect;
