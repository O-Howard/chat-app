import User from "../models/user.model.js";


const getUser = async(req, res)=>{
    try {
        const  {id} = req.params;

        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}

const searchUser = async(req,res)=>{
    try {
        
        const {query} = req.query;
        if (!query) {
            return res.status(400).json({ message: "Query is required" });
        }

        const users = await User.find({
            username: { $regex: `^${query}`, $options: "i" }

        }).select("username");

        res.status(200).json(users);
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "server error"});
    }
}

export {getUser, searchUser};