import User from "../models/Users.js";
import Role from "../models/Role.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

export const singUp = async (req, res) => {
  const { username, email, password, roles } = req.body;

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();

  const token = jwt.sign({ id: savedUser._id }, SECRET, {
    expiresIn: 86400,
  });

  res.json({ token });
};



export const singIn = async (req, res) => {
  const { email, password, roles } = req.body;
  const userFound = await User.findOne({ email }).populate("roles");

  if (!userFound) return res.status(400).json({ message: " User not found" });

  const matchPassword = await User.comparePassword(
    password,
    userFound.password
  );

  if (!matchPassword)
    return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign({ id: userFound._id }, SECRET, {
    expiresIn: 86400,
  });

  res.json({ token, userFound });
};
