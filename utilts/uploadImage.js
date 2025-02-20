import multer from "multer"

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
})

export const uploadimage=multer({storage:storage})