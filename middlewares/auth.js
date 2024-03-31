import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { User } from "../models/users.js";
const { SECRET_KEY } = process.env;

export const basicAuth = ctrlWrapper(async (req, res, next) => {
  //console.log(req.headers);
  const [type, base64data] = req.headers.authorization.split(" ");
  //console.log(type, base64data);
  if (type !== "Basic") throw HttpError(401);
  //console.log(Buffer.from(base64data, "base64").toString());
  const [email, password] = Buffer.from(base64data, "base64")
    .toString()
    .split(":");
  //console.log(email, password);
  const user = await User.findOne({ email });

  if (!user) throw HttpError(401);
  const isMatch = await bcrypt.compare(password, user.password);
  //console.log(isMatch);
  if (!isMatch) throw HttpError(401);
  req.user = user;
  next();
});

export const auth = ctrlWrapper(async (req, res, next) => {
  const [type, token] = req.headers.authorization.split(" ");

  if (type !== "Bearer") throw HttpError(401);
  const { id } = jwt.verify(token, SECRET_KEY);

  const user = await User.findById(id);

  if (!user && user.token === token) throw HttpError(401);

  req.user = user;
  next();
});
