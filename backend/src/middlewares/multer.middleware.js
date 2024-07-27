import multer from "multer";
import ApiError from "../utils/apiError.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/employeeImages')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
const fileFilter = (req, file, cb) => {
    const validTypes = ["image/jpeg", "image/png"];
    if(validTypes.includes(file.mimetype)){
        cb(null, true)
    }else{
        cb(new ApiError(400,"Invalid file type, Only JPG and PNG are allowed."))
    }
}
export  const upload = multer(
    {
        storage: storage ,
        fileFilter: fileFilter
    }
)