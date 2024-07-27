import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
import adminRoute from "./routes/admin.routes.js";
import employeeRoute from "./routes/employee.routes.js";
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/employee", employeeRoute);

export default app;
