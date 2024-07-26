import express from "express";
import cors from "cors";

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
app.use("/api/v1/admin", adminRoute);

export default app;
