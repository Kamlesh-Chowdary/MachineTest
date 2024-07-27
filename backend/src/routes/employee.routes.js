import Routes from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  modifyEmployee,
} from "../controllers/employee.controller.js";

const employeeRoute = Routes();

employeeRoute.route("/create").post(upload.single("image"), createEmployee);
employeeRoute.route("/get-employee").get(getEmployees);
employeeRoute
  .route("/modify/:employeeId")
  .patch(upload.single("image"), modifyEmployee);
employeeRoute.route("/delete/:employeeId").delete(deleteEmployee);
export default employeeRoute;
