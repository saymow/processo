import { createConnection } from "typeorm";

export default createConnection({
  type: "postgres",
  database: process.env.DATABASE,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASS,
  port: parseInt(process.env.DATABASE_PORT as string),
  synchronize: true,
  logging: true,
  entities: ["src/app/models/**/*.ts"],
})
  .then(() => {
    console.log("Database connected successfuly");
  })
  .catch((error) => {
    console.log("Error on connect to database.");
    console.error(error);
  });
