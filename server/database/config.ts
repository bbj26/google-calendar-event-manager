import { Sequelize } from "sequelize-typescript";
import { config } from "../config";
import path from "path";

const sequelize = new Sequelize({
  database: config.database.DB_NAME,
  dialect: config.database.DATABASE_DIALECT,
  username: config.database.DATABASE_USERNAME,
  password: config.database.DATABASE_PASSWORD,
  host: config.database.DATABASE_HOST,
  port: Number(config.database.DATABASE_PORT),
  models: [path.join(__dirname, "models")],
  logging: false,
});

export default sequelize;
