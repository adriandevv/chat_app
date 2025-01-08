import User from "../models/UserModel.js";

export const searchContacts = async (req, res) => {
try {
    const {contactRef} = req.body;

    if(contactRef===undefined || contactRef===null){
        return res.status(400).json({ message: "Contact Reference is required" });
    }

    const sanitizedContactRef = contactRef.replace(
        /[.*+?^${}()|[\]\\]/g,
        '\\%&'
    );
    const regex = new RegExp(sanitizedContactRef, 'i');
    const contacts = await User.find({
        $and: [
            {
                _id: { $ne: req.userId },
                profileSetup: true
            },
            {
                $or: [
                    { firstName: { $regex: regex } },
                    { lastName: { $regex: regex } },
                    { email: { $regex: regex } }
                ]
            }
        ]
    }).select('_id email firstName lastName Image color profileSetup');

    const formattedContacts = contacts.map(contact => ({
        _id: contact._id,
        email: contact.email,
        firstName: contact.firstName,
        lastName: contact.lastName,
        Image: contact.Image || null,
        color: contact.color || 0,
        profileSetup: contact.profileSetup
    }));
    console.log(formattedContacts);
    return res.status(200).json({formattedContacts});
} catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
}

}