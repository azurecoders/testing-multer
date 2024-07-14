import express from "express";
import { upload } from "../middlewares/upload.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import File from "../models/file.model.js";

const router = express.Router();

router.post("/file-upload", upload.single("profilePic"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const response = await uploadOnCloudinary(req.file.buffer);

  if (response) {
    const newFileUrl = new File({ fileUrl: response.secure_url });
    await newFileUrl.save();
    res.send(newFileUrl);
  } else {
    res.status(500).send("Something went wrong. Try Again!");
  }
});

export default router;
