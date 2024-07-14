import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fileRoute from "./routes/file.route.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("DB Connected");
});

const app = express();

app.use("/api/upload", fileRoute);

app.listen(process.env.PORT, () => console.log("Server is Working!"));
