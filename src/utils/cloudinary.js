const cloudinary = require("cloudinary").v2;
require ("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const test_image = "src/uploads/28b387e70f7f26fdd80a4fc558816262.png";

(async function uploadImage() {
  try {
    const result = await cloudinary.uploader.upload(test_image);
    console.log("Success✅\n", result);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
})();