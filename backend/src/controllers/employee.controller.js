import { Employee } from "../models/employee.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs";
const deleteImage = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      throw new ApiError(409, "Error while deleting the image");
    } else {
      return true;
    }
  });
};

const createEmployee = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber, designation, gender, course } = req.body;
  if (
    [name, email, phoneNumber, designation, gender, course].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required.");
  }
  const existingEmployee = await Employee.findOne({ email });
  if (existingEmployee) {
    throw new ApiError(409, "Employee with this email address already exists.");
  }
  const imageFilePath = req.file?.path;
  if (!imageFilePath) {
    throw new ApiError(400, "Employee Image is required");
  }

  const employeeCreate = await Employee.create({
    image: imageFilePath,
    name,
    email,
    phoneNumber,
    designation,
    gender,
    course,
  });
  const createdEmployee = await Employee.findById(employeeCreate._id).select(
    "-__v"
  );
  if (!createEmployee) {
    throw new ApiError(500, "Something went wrong while creating the employee");
  }

  res
    .status(200)
    .json(
      new ApiResponse(201, createdEmployee, "Employee created successfully")
    );
});

const getEmployees = asyncHandler(async (req, res) => {
  const employee = await Employee.find({}).select("-__v");
  if (!employee) {
    throw new ApiError(404, "Error while fetching employee details");
  }
  res
    .status(200)
    .json(new ApiResponse(201, employee, "Employee Data fetched successfully"));
});

const modifyEmployee = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  if (!employeeId) {
    throw new ApiError(404, "Employee Id is required");
  }

  const employeeExist = await Employee.findById(employeeId);

  if (!employeeExist) {
    throw new ApiError(404, "Invalid Employee Id");
  }

  const { name, email, phoneNumber, designation, gender, course } = req.body;
  if (
    [name, email, phoneNumber, designation, gender, course].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required.");
  }
  const imageFilePath = req.file?.path;
  if (!imageFilePath) {
    throw new ApiError(400, "Employee Image is required");
  }
  if (employeeExist.image !== imageFilePath) {
    deleteImage(employeeExist.image);
  }

  const updateEmployee = await Employee.findByIdAndUpdate(
    employeeId,
    {
      name,
      email,
      phoneNumber,
      designation,
      gender,
      course,
      image: imageFilePath,
    },
    {
      new: true,
    }
  );
  console.log(updateEmployee);
  if (!updateEmployee) {
    throw new ApiError(404, "Error while updating the employee details");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        201,
        updateEmployee,
        "Employee details updated successfully"
      )
    );
});

const deleteEmployee = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  if (!employeeId) {
    throw new ApiError(401, "Employee Id is required");
  }
  const employeeExist = await Employee.findById(employeeId);
  if (!employeeExist) {
    res
      .status(200)
      .json(
        new ApiResponse(200, {}, "Employee with this Id is already deleted")
      );
  } else {
    deleteImage(employeeExist.image);

    const employeeToDelete = await Employee.findByIdAndDelete(employeeId);
    if (!employeeToDelete) {
      throw new ApiError(409, "Error while deleting the employee");
    }

    res
      .status(200)
      .json(
        new ApiResponse(201, employeeToDelete, "Employee Deleted Successfully")
      );
  }
});
export { createEmployee, getEmployees, modifyEmployee, deleteEmployee };
