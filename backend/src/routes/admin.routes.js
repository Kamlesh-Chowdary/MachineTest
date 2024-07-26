import { registerAdmin } from "../controllers/admin.controller.js";
import Router from "express";

const adminRoute = Router();

adminRoute.route("/register").post(registerAdmin);

export default adminRoute;
