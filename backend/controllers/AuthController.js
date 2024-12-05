import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

export const singup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const  user = await User.create({ email, password });
    
    if (!user) {
      return res.status(400).json({ error: "User already exists" });
    }
console.log(user);
    res.cookie("jwt", createToken(user.email,user._id), {
      maxAge: maxAge,
      httpOnly: true,
      secure:true
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

    const user = await User.findOne({email});
    
    if (!user) {
      return res.status(400).json({ error: "User email or password is incorrect" });
    }
    const auth = await compare(password, user.password);
    
    if (!auth) {
      return res.status(400).json({ error: "User email or password is incorrect" });
    }
    console.log(user);
    const token = createToken(user.email, user._id);

    res.cookie("jwt", token, {
      maxAge: maxAge,
      sameSite: "none",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
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

export const getUSerInfo = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const user = await User.findById(decodedToken.userId);
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
    });
  } catch (error) {
    res.status(500).json({ mensaje: error });
    console.log(error);
  }
}
