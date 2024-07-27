import Routes from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createEmployee } from "../controllers/employee.controller.js";

const employeeRoute = Routes();

employeeRoute.route("/create").post(upload.single("image"),createEmployee)

export default employeeRoute;