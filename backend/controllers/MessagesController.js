import Messages from "../models/MessagesModel.js";
import { mkdirSync, renameSync } from "fs";

export const getMessages = async (req, res) => {
  try {
    const userReq = req.userId;
    const usertTo = req.body.id;

    if (!usertTo || !userReq) {
      return res.status(400).json({ message: "Both user ID`s are required!." });
    }
    const messages = await Messages.find({
      $or: [
        { $and: [{ sender: userReq }, { recipient: usertTo }] },
        { $and: [{ sender: usertTo }, { recipient: userReq }] },
      ],
    }).sort({ timestamp: 1 });

    return res.status(200).json({ messages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }
    const date =  Date.now();
    let fileDir = `uploads/files/${date}`;
    let fileName = `${fileDir}/${req.file.originalname}`;

    mkdirSync(fileDir, { recursive: true });
    renameSync(req.file.path, fileName);

    return res
      .status(200)
      .json({ message: "File uploaded successfully", filePath: fileName });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
