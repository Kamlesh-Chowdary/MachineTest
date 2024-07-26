import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { Register } from "../models/register.model.js";
import ApiResponse from "../utils/apiResponse.js";

const registerAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (username.trim() === "" || password.trim() === "") {
    throw new ApiError(400, "Username or Password missing");
  }

  const existingAdmin = await Register.findOne({ username });
  if (existingAdmin) {
    throw new ApiError(409, "Admin with this username already Exists");
  }

  const createAdmin = await Register.create({
    username,
    password,
  });

  const createdAdmin = await Register.findById(createAdmin._id).select(
    "-password -__v"
  );
  if (!createdAdmin) {
    throw new ApiError(404, "Error while registering new Admin");
  }
  res
    .status(200)
    .json(new ApiResponse(201, createdAdmin, "Admin Registered successfully"));
});

export { registerAdmin };
