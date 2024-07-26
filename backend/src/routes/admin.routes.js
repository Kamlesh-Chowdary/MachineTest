import { loginAdmin, registerAdmin } from "../controllers/admin.controller.js";
import Router from "express";

const adminRoute = Router();

adminRoute.route("/register").post(registerAdmin);
adminRoute.route("/login").post(loginAdmin);
export default adminRoute;
