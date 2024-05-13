const cloudinary = require("cloudinary").v2;
require ("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const images = [
  "public/images/cctv.jpg",
  "public/images/cleaning.jpg",
  "public/images/electrical.jpg",
  "public/images/gardening.jpg",
  "public/images/painting.jpg",
  "public/images/pet.jpg",
  "public/images/plumbing.jpg",
  "public/images/pool.jpg"
];

(async function uploadImage() {
  try {
    for (const image in images){
      const result = await cloudinary.uploader.upload(images[image], { folder: "ServEase" });
      console.log(result);
    }
    console.log("Success✅");
  } catch (error) {
    console.error('Error uploading image:', error);
  }
})();