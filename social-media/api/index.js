import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";
import postRoute from "./routes/postRoutes.js";
import uploadRoute from "./routes/uploadRoutes.js";
import chatRoute from "./routes/chatRoutes.js";
import messageRoute from "./routes/msgRoutes.js";
// import router from "./routes/authRoutes.js";
// const PORT = 8000;

const app = express();

app.use(express.static("public"));
app.use("/images", express.static("images"));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

dotenv.config();

mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => console.log("Database is running successfully"))
  .catch((err) => console.log(err));

//   routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/posts", postRoute);
app.use("/upload", uploadRoute);
app.use("/chat", chatRoute);
app.use("/message", messageRoute);
// app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log("Server is running successfully at port no " + process.env.PORT);
});
