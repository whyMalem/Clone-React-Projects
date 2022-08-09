import express from "express";
const app = express();
const PORT = 8800;
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import Router from "./routes/route.js";
dotenv.config();

// database connection
const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.vxwms.mongodb.net/blog-app?retryWrites=true&w=majority`;

mongoose
  .connect(URL, { useNewUrlParser: true })
  .then(() => console.log("Database running successfully"))
  .catch((error) => console.log("Error while connecting the database" + error));

//   routes
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);

app.listen(PORT, () => {
  console.log("Express server running successfully at port no " + PORT);
});
