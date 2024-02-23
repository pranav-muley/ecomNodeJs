//1 import multer
const multer = require('multer');


//2 config file name and location
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads');
    },
    filename:(req, file, callback)=>{
        callback(
            null,
            new Date().toISOString().replace(/:/g, '_') 
            +file.originalname)
        }
})


const upload = multer({
    storage
});

module.exports = upload;