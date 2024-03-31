import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { User } from "../models/users.js";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;
export const login = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw HttpError(409, "User not found!");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw HttpError(401);
  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
  await User.findOneAndUpdate({ email }, { token });
  res.json({ token });
});

export const getCurrent = ctrlWrapper((req, res) => {
  res.send(req.user);
});
export const register = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) throw HttpError(409, "Email in use");
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashPassword });

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
});
