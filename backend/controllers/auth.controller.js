import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from '../lib/utils/generateToken.js'

export const signUp = async (req,res)=>{
    try{
        const {fullName,userName,email,password} = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
        if(!emailRegex.test(email)){
            return res.status(400).json({error:"Invalid email format."});
        }

        const existingUser = await User.findOne({userName})
        if(existingUser){
            return res.status(400).json({error:"User name already taken."});
        }

        const existingEmail = await User.findOne({email})
        if(existingEmail){
            return res.status(400).json({error:"Already have an account with this Emial."});
        }

        if(password.length<6){
            return res.status(400).json({error:"Password must be atlest 6 characters."})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            userName,
            email,
            password:hashedPassword,
        })

        if(newUser){
            await newUser.save();
            generateTokenAndSetCookie(newUser._id,res);

            return res.status(201).json({
                _id: newUser._id,
				fullName: newUser.fullName,
				userName: newUser.userName,
				email: newUser.email,
				followers: newUser.followers,
				following: newUser.following,
				profileImg: newUser.profileImg,
				coverImg: newUser.coverImg,
            });
        }else{
            return res.status(400).json({error:"Invalid user data"});
        }
    }catch(error){
        console.log(`Error in signUp controller: ${error.message}`);

		// ✅ Send actual validation error message
		if (error.name === "ValidationError") {
			return res.status(400).json({ error: error.message });
		}

		return res.status(500).json({ error: "Internal server error" });
    }
}

export const login = async (req,res)=>{
    try{
        const {userName,password} = req.body;
        const user = await User.findOne({userName});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password||"");

        if(!user){
            return res.status(400).json({error:"Username or Password is Incorrect."});
        }
        if(!isPasswordCorrect){
            return res.status(400).json({error:"Username or Password is Incorrect."});
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
                _id: user._id,
				fullName: user.fullName,
				userName: user.userName,
				email: user.email,
				followers: user.followers,
				following: user.following,
				profileImg: user.profileImg,
				coverImg: user.coverImg,
        })
    }catch(error){
        console.log(`Error in Login controller:${error.message}`);
        res.status(500).json({error:"Internal server error"});
    }
}

export const logOut = async (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logout Successfully"});
    }catch(error){
        console.log(`Error in Login controller:${error.message}`);
        res.status(500).json({error:"Internal server error"});
    }
}


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'userName email fullName password'); 
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMe = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select("-password");
		res.status(200).json(user);
	} catch (error) {
		console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
