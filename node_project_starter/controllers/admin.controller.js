import User from '../models/user.model.js';

export const deleteUser = async (req, res) => {
    const {username} = req.body;

    if (!req.session.isAdmin)
        return res.status(403).send("Access denied")
    try {
        const deletedUser = await User.findOneAndDelete({username});
  
        if (!deletedUser)
            return res.status(404).send("User not found");
  
        return res.status(200).json({
            message: "User deleted successfully",
            userID: deletedUser._id,
            username: deletedUser.username
        });
    } 
    catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
};

export const deleteAllUsers = async (req, res) => {
    if (!req.session.isAdmin)
        return res.status(403).send("Access denied")
    try {
        await User.deleteMany({});
        res.status(200).send("All users deleted successfully");
    } 
    catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
};

export const getUser = async (req, res) =>{
    const {username} = req.body;

    if (!req.session.isAdmin)
        return res.status(403).send("Access denied")
    try{
        const user = await User.findOne({username});
        res.status(200).json(user);
    }
    catch(err){
        console.error(err);
        res.status(500).send("Internal server error");
    }
};

export const getAllUsers = async (req, res) =>{
    if (!req.session.isAdmin)
        return res.status(403).send("Access denied")

    try{
        const users = await User.find({});
        res.status(200).json(users);
    }
    catch(err){
        console.error(err);
        res.status(500).send("Internal server error");
    }
};