import express from "express";
import { upload } from "../middlewares/upload.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";
import File from "../models/file.model.js";

const router = express.Router();

router.post("/file-upload", upload.single("profilePic"), async (req, res) => {
  console.log(req.file);
  const response = await uploadOnCloudinary(req.file.path);

  if (response !== null) {
    const newFileUrl = new File({ fileUrl: response.secure_url });
    await newFileUrl.save();
    res.send(newFileUrl);
  } else {
    res.send("Something went wrong. Try Again!");
  }
});

export default router;
