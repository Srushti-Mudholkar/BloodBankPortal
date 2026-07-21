import dotenv from 'dotenv'
import Users from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import crypto from "crypto";
import  {sendVerificationEmail}  from "../utils/emailService.js";

dotenv.config()

export const  registerController  = async(req ,res) => {
    try {
       const {role, name, organisationName, hospitalName, email, password, address, phone, bloodGroup, website} = req.body;

       const existingUser = await Users.findOne({email});
       if(existingUser){
        return res.status(409).send({
            success : false,
            message : 'User exists already'
        })
       }

       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password,salt);

       // Generate verification token
      const verificationToken = crypto.randomBytes(32).toString("hex");

       const user = new Users({
         role,
         name,
         organisationName,
         hospitalName,
         email,
         website,
         password : hashedPassword,
         address,
         phone,
         verificationToken,
         ...(bloodGroup && bloodGroup !== " " && {bloodGroup})
       })
 
        await user.save();

          console.log('hi1')
         await sendVerificationEmail({
           email: user.email,
           name: user.name || user.organisationName || user.hospitalName,
           verificationToken,
         });
         console.log('hi')

        return res.status(201).send({
            success : true,
            message : 'User registered successfully',
            user : {
            role : user.role,
            _id : user._id,
            name : user.name,
            organisationName :  user.organisationName,
            email : user.email,
            phone : user.phone,
            address : user.address,
            bloodGroup : user.bloodGroup,
            }
        })

    }
    catch(e){
        console.log(e);
        return res.status(500).send({
            success : false,
            message : 'An error occured'
            
        })
    }
}

export const verifyEmailController = async(req,res)=>{
    try{
        const {token} = req.params;

        const user = await Users.findOne({
            verificationToken: token
        });

        if(!user){
            return res.status(400).send({
                success:false,
                message:"Invalid verification link"
            });
        }

        user.isVerified = true;
        user.verificationToken = undefined;

        await user.save();


        return res.status(200).send({
            success:true,
            message:"Email verified successfully"
        });


    }catch(e){

        console.log(e);

        return res.status(500).send({
            success:false,
            message:"Verification failed"
        });
    }
};

export const loginController = async (req,res) => {
    try{
        const {role,email,password} = req.body;
        console.log(req.body);
        
        if(!role || !email || !password){
            return res.status(400).send({
                success : false,
                message : 'Desired fields are not filled'
            })
        }

        const existingUser = await Users.findOne({email});
       console.log(existingUser)

        if(!existingUser){
            return res.status(400).send({
                success : false,
                message : 'User doesnt exists'
            })
        }

        if(role !== existingUser.role){
            return res.status(403).send({
                success : false,
                message : 'You are not desired user as role is not matching'
            })
        }

        const comparePassword = await bcrypt.compare(password,existingUser.password);
        if(!comparePassword){
            return res.status(401).send({
                success : false,
                message : 'Password not matching',
            })
        }

        if (!existingUser.isVerified) {
                return res.status(401).send({
                    success: false,
                    message: "Please verify your email first.",
              });
       }

        const token = jwt.sign({userId : existingUser._id, role : existingUser.role},process.env.JWT_SECRET, {expiresIn : '1d'});
        return res.status(200).send({
            success : true,
            message : 'Login successful token created',
            token,
            user : {
                name : existingUser.name,
                role : existingUser.role,
                email : existingUser.email,
                phone : existingUser.phone,
                address : existingUser.address,
                bloodGroup : existingUser.bloodGroup,
                website : existingUser.website
            }
        })

    } catch (e){
        console.log(e)
        return res.status(500).send({
            success : false,
            e,
            message : 'An error occured',
            
        })
    }
}

// GET CURRENT USER
export const currentUserController = async(req,res) => {
    try {
       const user1 = await Users.findById(req.user.userId).select("-password");
       
       if(!user1){
        return res.status(404).send({
            success : false,
            message : 'user not found'
        })
       }
       
       return res.status(200).send({
         success : true,
         message : 'current user got successfully',
         user : user1
       })

    } catch (e){
        console.log(e);
       return res.status(500).send({
            success : false,
            message : 'An error occured',
            e
        })
    }
}