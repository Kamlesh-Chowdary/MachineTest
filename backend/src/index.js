import connectDB from "./DB/db.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});
const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error while connecting to server", error);
    });
    app.listen(port, () => {
      console.log("Server is listening at port :", port);
    });
  })
  .catch((error) => {
    console.log("MongoDb connection failed: ", error);
  });
