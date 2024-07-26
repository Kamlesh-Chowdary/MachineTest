import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connection to Database Successfull !");
  } catch (error) {
    console.log("Connection to DataBase Failed: ", error.message);
    process.exit(1);
  }
};

export default connectDB;
