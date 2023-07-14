import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/auth.js";
import classRoutes from "./routes/class.js";
import coachRoutes from "./routes/coach.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
dotenv.config();

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "./client/build")));

app.use("/user", userRoutes);
app.use("/api", classRoutes);
app.use("/api", coachRoutes);

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 5000;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on mode on port ${PORT}`
  );
});
