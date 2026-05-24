import bcrypt from 'bcrypt'
import User from "../models/user.model.js";
import { generateToken } from '../utils/token.js';

const register = async(req,res)=>{
    try {
        const {username, email, password} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({message: "Missing fields"})
        }

        const user = await User.findOne({$or : [{username}, {email}]});
        if (user) {
            return res.status(400).json({message: "Email or username already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "Server error"});
    }
}

const login = async(req, res)=>{
    try {
        const {identifier, password} = req.body;

        if (!identifier || !password) {
            return res.status(400).json({message: "Missing fields"})
        }

        const user = await User.findOne({$or: [{username: identifier}, {email: identifier}]});
        if (!user) {
            return res.status(401).json({message: "invalid credentials"});           
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({message: "invalid credentials"})
        }

        const token = generateToken(user._id);
        res.status(200).json({
            token,
            user:{
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    } catch (error) {
        return res.status(500).json({message: "Server error"});
    }
}

const getMyProfile = async(req, res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}

export {register, login, getMyProfile};