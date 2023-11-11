import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

// Configure env (its in our root folder thats why we dont need to define path)
dotenv.config();

// Database Config
connectDB();

// App
const app = express();

// middlewares
app.use(cors()); // for calling API on client side
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);

// Dummy API
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Port number
const PORT = 8080 || process.env.PORT;

// Server listening
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgBlue
      .white
  );
});
