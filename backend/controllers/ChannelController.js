import User from "../models/UserModel.js";

export const createChannel = async(req, res, next )=>{
    try {
        const {name, members} = req.body;
        const {userId} = req;

        const admin  = await User.findById(userId);

        if(!admin){
            return res.status(400).json({message: "Admin not found"});
        }
        const validMembers = User.find({_id:{ $in: members}});
        
        if(validMembers.length !== members.length){
            return res.status(400).json({message: "Some members are not valid users."});
        }
        const newChannel = new Channel({
            name,
            members,
            admin: userId,
        });
        await newChannel.save();
        return res.status(201).json({channel});
    } catch (error) {
        console.log(error);
    }

}