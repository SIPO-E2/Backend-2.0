import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user";
import { Client } from "../models/client";
import { Project } from "../models/project";
import { JobPosition } from "../models/jobPosition";
import { Opening } from "../models/opening";
import { Employee } from "../models/employee";
import dotenv from "dotenv";
dotenv.config();

// Daniela
//  daniela Abelanda22

// Uma "sisweb_user" "HDK#$%Ljkwerff.89"

// Hector   "hector" "cehn22za02"

// Camila  "camila" "tititoto"

const connection = new Sequelize({
  database: "sipo",
  username: "hector",
  password: "cehn22za02",
  host: "localhost",
  port: Number("5432"),
  dialect: "postgres",
  models: [User, Client, Project, JobPosition, Opening, Employee],
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
