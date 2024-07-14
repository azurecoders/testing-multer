import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dbt8yugrw",
  api_key: "865967281437633",
  api_secret: "qccBhzifZ8gDvgooKHMujKTPPxE",
});

export const uploadOnCloudinary = async (buffer) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
      stream.end(buffer);
    });
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
