const multer = require('multer');
const path = require('path');
const maxSize = 100 * 1024 * 1024;



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/uploads/'))
    },
    filename: function (req, file, cb) {
      const originalNameNoSpace = file.originalname.replace(/\s+/g, '')
      
      cb(null, `${Date.now()}-${originalNameNoSpace}`)
    },
    
  })
  
  const upload = multer({ 
    storage,
    limits: {
      fileSize: maxSize,
  },
    fileFilter: function (req, file, cb) {
      const filetypes = /jpeg|jpg|png|gif/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname));

      if ( extname && mimetype) {
        return cb(null, true);
      }
      cb("Error: Unknown file type")
    }
  })
  module.exports = upload;