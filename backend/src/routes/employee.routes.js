import Routes from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createEmployee, getEmployees } from "../controllers/employee.controller.js";

const employeeRoute = Routes();

employeeRoute.route("/create").post(upload.single("image"),createEmployee)
employeeRoute.route("/get-employee").get(getEmployees)
export default employeeRoute;