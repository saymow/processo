import express from "express";
import cors from "cors";
import "express-async-errors";
import "reflect-metadata";
import "./database";

import Router from "./routes";
import {
  handleError,
  handleRouteNotFound,
} from "./middlewares/errorMiddleware";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api", Router);
app.get("/", (req, res) => res.send());
app.use(handleRouteNotFound);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server is up and and running on port: ${PORT}`);
});
