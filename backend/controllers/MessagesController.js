import Messages from "../models/MessagesModel.js";

export const getMessages = async (req, res) => {
try {
    const userReq = req.userId;
    const usertTo = req.body.id;



    if(!usertTo || !userReq ) {
        return res.status(400).json({ message: "Both user ID`s are required!." });
    }
   const messages = await Messages.find(
{

    $or: [
        { $and: [{ sender: userReq }, { recipient: usertTo }] },
        { $and: [{ sender: usertTo }, { recipient: userReq }] },
    ],
}

   ).sort({ timestamp: 1 });


    return res.status(200).json({messages});
} catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
}

}