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

const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (username.trim() === "" || password.trim() === "") {
    throw new ApiError(400, "Username or Password missing");
  }
  const admin = await Register.findOne({ username });
  if (!admin) {
    throw new ApiError(404, "Admin with this username doesn't exist");
  }

  const isPasswordCorrect = await admin.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid Password");
  }
  const loggedInAdmin = await Register.findById(admin._id).select(
    "-password -__v"
  );
  res
    .status(200)
    .json(new ApiResponse(201, loggedInAdmin, "Admin LoggedIn successfully"));
});

export { registerAdmin, loginAdmin };
