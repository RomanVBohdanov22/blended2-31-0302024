import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

export const login = ctrlWrapper(() => {});
export const getCurrent = ctrlWrapper((req, res) => {
  res.send("Current");
});
export const register = ctrlWrapper(() => {});
