const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uploadOnCloudinary = require("../config/cloudinary");
const { sendWelcomeEmail } = require("../../emails/emailHandler");

 //require('dotenv').config()

exports.createAccount = async (req, res,next) => {
    try {
        const { fullName, email, password } = req.body;
        // TODO: Validate the input data
if(!fullName || !email || !password){
    return res.status(400).json({message: 'Please provide all fields'})
      }
      // check email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)){
        return res.status(400).json({message: 'Please provide a valid email'})
      }
        // TODO: Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // TODO: Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // TODO: Create the user in the database
        const newUser = await User.create({ fullName, email, password: hashedPassword});
        // TODO: Send a response with the user data
        const token = jwt.sign({ id: newUser._id },process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true,
            secure:true,
            sameSite:"lax",
            maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
         });

      res.status(201).json({ message: 'User created successfully', user: newUser, token })
      try {
       await sendWelcomeEmail(newUser.email,newUser.fullName,process.env.CLIENT_URL)
      } catch (error) {
        console.error("Error sending welcome email:", error);
      }
    } catch (error) {
         next(error)
    }
}


exports.login = async (req,res,next) => {
    try {
        // TODO: Get the email and password from the request body
        const { email, password } = req.body;

        // TODO: Check if the user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // TODO: Compare the password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });

        }
        const token = jwt.sign({id:existingUser._id},process.env.JWT_SECRET,{expiresIn:'15d'})

           res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:"lax",
            maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
           })
        return res.status(200).json({message:"login successfull",token,success:true,user:existingUser})

    } catch (error) {
        next(error)
    } 
}

 exports.getAuthUser = async (req,res,next) => {
    try {
        const user = await User.findById(req.user).select('-password')
         res.status(200).json({message:"user fetched",user,success:true})
    } catch (error) {
        next(error)
    }
 }

 // logout user

  exports.logout = async (req,res,next) => {
    try {
        res.clearCookie('token',{
            httpOnly:true,
            secure:true,
            sameSite:'lax'
        })
        return res.status(200).json({message:'logout successfull'})
    } catch (error) {
        next(error)
    }
  }

  
 exports.checkAuth = async (req,res,next) => {
     try {
       return res.status(200).json({message:'seller is authenticated',success:true})

     } catch (error) {
        
     }
 }

 exports.updateProfile = async (req,res,next) => {
     try {
        const {fullName,profilePic,bio} = req.body
        let updatedUser;
        // check if profile pic is provided
        if(!profilePic) {
            updatedUser = await User.findByIdAndUpdate(req.user,{fullName,bio},{new:true})
        } else {
            const upload = await uploadOnCloudinary(profilePic)
            updatedUser = await User.findByIdAndUpdate(req.user,{
                profilePic:upload.secure_url,
                fullName,
                bio
            },{new:true})
        }
 return res.status(200).json({message:'profile updated',success:true,user:updatedUser})
 
     } catch (error) {
        next(error)
     }
 }