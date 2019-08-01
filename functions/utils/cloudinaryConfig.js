const  multer =  require('multer');
const  cloudinary =  require('cloudinary');
const  cloudinaryStorage =  require('multer-storage-cloudinary');
const  dotenv = require('dotenv')


dotenv.config();

const configDevObj = {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
};

cloudinary.config(configDevObj);

const storage = cloudinaryStorage({
  cloudinary,
  folder: '/images',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }]
});

const parser = multer({ storage });

export default parser;