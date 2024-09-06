import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

//register user

const registerUser = async (req, res)=>{
    const {name, email, password} = req.body;

    try{
        const user = await userModel.findOne({email});

        if(user){
            return res.status(400).json({sucess: false,message: "User already exists"});
        }

        if(!validator.isEmail(email)){
            return res.status(400).json({sucess: false,message: "Invalid email"});
        }

        if(password.length < 6){
            return res.status(400).json({sucess: false,message: "Password must be atleast 6 characters"});
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        const token = createToken(savedUser._id);
        res.json({sucess: true, token});
    }catch(err){
        console.log(err);
        res.status(500).json({sucess: false,message: "Internal server error"});
    }
};

//login user
const loginUser  = async(req, res)=>{
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({sucess: false,message: "user does not exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({sucess: false,message: "Invalid password"});
        }

        const token = createToken(user._id);
        res.json({sucess: true, token});
    }catch(err){
        console.log(err);
        res.status(500).json({sucess: false,message: "Internal server error"});
    }
}

const getUser = async (req, res) => {
    try {
      const user = await userModel.findById(req.user.id);
      res.json({ success: true, user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  

export {registerUser, loginUser, getUser};