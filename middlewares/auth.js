import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

export const auth = ctrlWrapper((req, res, next) => {
  console.log(req.headers);

  next();
});
