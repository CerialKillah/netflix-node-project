
var multer = require('multer');
const { uuid } = require('uuidv4');

var serverpath = multer.diskStorage({
  destination: (req, file, path) => {
    if (file.fieldname === 'poster') {
      path(null, 'public/images');
    } else if (file.fieldname === 'video') {
      path(null, 'public/videos');
    } else {
      path(null, 'public/images');
    }
  },
  filename: (req, file, path) => {
    console.log(file.originalname);
    var ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    var myfile = uuid() + ext;
    path(null, myfile);
  }
});

var upload = multer({ storage: serverpath });

module.exports = upload;