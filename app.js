import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import userRouter from "./router/userRouter.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const { DB_HOST, PORT = 3000 } = process.env;
console.log(DB_HOST);
mongoose
  .connect(DB_HOST)
  .then(
    () => app.listen(PORT),
    console.log(`Database connection successful. API on Port: ${PORT}`)
  )
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
