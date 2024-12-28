import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.create({ email, password });

    if (!user) {
      return res.status(400).json({ error: "User already exists" });
    }
    console.log(user);
    res.cookie("jwt", createToken(user.email, user._id), {
      maxAge: maxAge,
      httpOnly: true,
      secure: true,
    });
    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.Image,
      },
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.errmsg });
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ error: "User email or password is incorrect" });
    }
    const auth = await compare(password, user.password);

    if (!auth) {
      return res
        .status(400)
        .json({ error: "User email or password is incorrect" });
    }
    console.log(user);
    const token = createToken(user.email, user._id);

    res.cookie("jwt", token, { 
      maxAge: maxAge,
      httpOnly: true, // Mayor seguridad para que no sea accesible desde JS
      secure: false, // Cambiar a true en producción con HTTPS
      sameSite: "Lax", // Permitir envío de cookies en navegación de origen cruzado
    });
    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.Image,
        color: user.color,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    res.status(500).json({ mensaje: error });
    console.log(error);
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.Image,
        color: user.color,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    res.status(500).json({ mensaje: error });
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req;
    const { firstName, lastName, color } = req.body;

    if (!firstName || !lastName || color === undefined) {
      return res
        .status(400)
        .json({ error: "First name, last name and color are required" });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, color, profileSetup: true },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.Image,
        color: user.color,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    res.status(500).json({ mensaje: error });
    console.log(error);
  }
};

export const addProfileImage = async (req, res) => {
  try {
    const { userId } = req;

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }
    const date = Date.now();
    const fileName = `uploads/profiles/${date}${req.file.originalname}`;

    // Renombrar el archivo
    fs.renameSync(req.file.path, fileName);

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { Image: fileName },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      user: {
        image: updateUser.Image,
      },
    });
  } catch (error) {
    res.status(500).json({ mensaje: error });
    console.log(error);
  }
};

export const deleteProfileImage = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.Image) {
      fs.unlinkSync(user.Image);
    }
    user.Image = null;
    await user.save();
    return res.status(200).json({
      user: {
        image: user.Image,
      },
    });
  } catch (error) {
    res.status(500).json({ mensaje: error });
    console.log(error);
  }
};

export const logout = async (req, res) => {
try {
  res.cookie("jwt", "", { 
    maxAge: 1,
    httpOnly: true, // Mayor seguridad para que no sea accesible desde JS
    secure: false, // Cambiar a true en producción con HTTPS
    sameSite: "Lax", // Permitir envío de cookies en navegación de origen cruzado
  });
  res.status(200).json({ mensaje: "Logout successful" });
  
} catch (error) {
  res.status(500).send("Internal server error");
}
}