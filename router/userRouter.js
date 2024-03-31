import express from "express";
import { getCurrent, login, register } from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";

const Router = express.Router();

Router.post("/register", register);
Router.post("/login", login);
Router.get("/current", auth, getCurrent);

export default Router;
