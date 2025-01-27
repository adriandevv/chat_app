import mongoose from "mongoose";
import User from "../models/UserModel.js";
import Messages from "../models/MessagesModel.js";

export const searchContacts = async (req, res) => {
  try {
    const { contactRef } = req.body;

    if (contactRef === undefined || contactRef === null) {
      return res.status(400).json({ message: "Contact Reference is required" });
    }

    const sanitizedContactRef = contactRef.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\%&"
    );
    const regex = new RegExp(sanitizedContactRef, "i");
    const contacts = await User.find({
      $and: [
        {
          _id: { $ne: req.userId },
          profileSetup: true,
        },
        {
          $or: [
            { firstName: { $regex: regex } },
            { lastName: { $regex: regex } },
            { email: { $regex: regex } },
          ],
        },
      ],
    }).select("_id email firstName lastName Image color profileSetup");

    const formattedContacts = contacts.map((contact) => ({
      _id: contact._id,
      email: contact.email,
      firstName: contact.firstName,
      lastName: contact.lastName,
      Image: contact.Image || null,
      color: contact.color || 0,
      profileSetup: contact.profileSetup,
    }));
    console.log(formattedContacts);
    return res.status(200).json({ formattedContacts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getContactsForDMList = async (req, res, next) => {
  try {
    let { userId } = req;
    userId = new mongoose.Types.ObjectId(userId);

    const contacts = await Messages.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }],
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$sender", userId] },
              then: "$recipient",
              else: "$sender",
            },
          },
          lastMessageTime: { $first: "$timestamp" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "contactInfo",
        },
      },
      {
        $unwind: "$contactInfo",
      },
      {
        $project: {
          _id: 1,
          lastMessageTime: 1,
          firstName: "$contactInfo.firstName",
          lastName: "$contactInfo.lastName",
          email: "$contactInfo.email",
          Image: "$contactInfo.Image",
          color: "$contactInfo.color",
        },
      },
      {
        $sort: { lastMessageTime: -1 },
      },
    ]);
    return res.status(200).json({ contacts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
