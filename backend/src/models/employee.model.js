import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      minLength: [4, "Employee FullName should have atleast 4 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: (value) => {
          return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
            value
          );
        },
        message: () => {
          return "Invalid Email Address";
        },
      },
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: (value) => {
          return /^\d{10}$/g.test(value);
        },
        message: () => {
          return "Invalid Phonenumber";
        },
      },
    },
    designation: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Employee = mongoose.model("employee", employeeSchema);
