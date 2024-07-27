import {Employee} from "../models/employee.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createEmployee = asyncHandler(async (req, res) => {
    const {name, email, phoneNumber, designation, gender, course} = req.body;
    if([name, email, phoneNumber, designation, gender,course].some(field=> field?.trim() === "")){
        throw new ApiError(400, "All fields are required.")
    }
    const existingEmployee = await Employee.findOne({email});
    if(existingEmployee){
        throw new ApiError(409,"Employee with this email address already exists.")
    }
    const imageFilePath = req.file?.path;
    if(!imageFilePath){
        throw new ApiError(400, "Employee Image is required");
    }

    const employeeCreate = await Employee.create({
        image: imageFilePath,
        name,
        email,
        phoneNumber,
        designation,
        gender,
        course
    })
    const createdEmployee = await Employee.findById(employeeCreate._id).select("-__v");
    if(!createEmployee){
        throw new ApiError(500, "Something went wrong while creating the employee")
    }

    res.status(200).json( new ApiResponse(201, createdEmployee,"Employee created successfully"))
})

export {createEmployee}