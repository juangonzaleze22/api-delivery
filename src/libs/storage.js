const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './storage/imgs')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    },
    
  })
  
  const upload = multer({ 
    storage,
    fileFilter: function (req, file, cb) {
      const filetypes = /jpeg|jpg|png|gif/;
      const extname = filetypes.test(path.extname(file.originalname));
      if ( extname) {
        return cb(null, true);
      } else{
        cb("Error: Images Only!");
      }
    }
  })
  module.exports = upload;