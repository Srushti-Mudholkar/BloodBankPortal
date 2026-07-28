import Users from "../models/userModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendPasswordResetEmail } from "../utils/emailService.js";

// UPDATE PROFILE
export const updateProfileController = async(req,res) => {
    try {
      const {name, organisationName, hospitalName, website,  address,  phone, bloodGroup} = req.body;

      const updateProfile = await Users.findByIdAndUpdate(
        req.user.userId,
        {name,  organisationName, hospitalName,  website,  address, phone, bloodGroup},
        {new : true, runValidators : false}
      ).select("-password")

       return res.status(200).send({
         success : true,
         message : 'User profile updated successfully',
         user : updateProfile
       })

    } catch (e){
       return res.status(500).send({
            success : false,
            message : 'An error occured while updating user profile details'
        })
    }
}

// CHANGE PASSWORD (logged in user)
export const changePasswordController = async(req,res) => {
  try {
    const {currentPassword,newPassword} = req.body;

    const user = await Users.findById(req.user.userId);
    console.log(user)
    if(!user){
      return res.status(404).send({ success : false , message : 'User doesnt exist'});
    }

    const isMatch = await bcrypt.compare(currentPassword,user.password);

    if(!isMatch){
      return res.status(404).send({ success : false , message : 'Invalid current passoword' })
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword,salt);

    await user.save();

    return res.status(200).send({ success : true, message : 'Successfully changed the passowrd'});

  } catch(e){
    console.log(e)
     return res.status(500).send({
            success : false,
            message : 'An error occured while changing users password'
        })
  }
}

// FORGOT PASSWORD — send reset email
export const forgotPasswordController = async(req,res) => {
  try {
     const {email} = req.body;
     const user = await Users.findOne({email});

     if(!user){
       return res.status(200).send({ success : false, message : 'Please wait the peocess is ongoing'});
     }

     // Generate token
     const resetToken = crypto.randomBytes(32).toString("hex");
     const hashedPassword = crypto.createHash("sha256").update(resetToken).digest("hex");

     user.resetPasswordToken = hashedPassword;
     user.resetPasswordExpires = Date.now() + 60*60*1000;

     await user.save();

     const name = user.name || user.organisationName || user.hospitalName;

     await sendPasswordResetEmail({name, email : user.email,  resetToken});
     return res.status(200).send({success : true, message : 'Password resetted successfully '})
  } catch(e){
      return res.status(500).send({
            success : false,
            message : 'An error occured while setting up the forgetting password'
      })
  }
}

// RESET PASSWORD — with token from email
export const resetPasswordController = async(req, res) => {
  try {
      const {token} = req.params;
      const {newPassword} = req.body;

      console.log("Token:", token);
      console.log("Body:", req.body);
      console.log("newPassword:", newPassword);

      const hashedPassword = crypto.createHash("sha256").update(token).digest("hex");

      const user = await Users.findOne({
         resetPasswordToken : hashedPassword,
         resetPasswordExpires : { $gt : Date.now() }
      })

      if(!user){
        return res.status(400).send({
          success : false,
          message : 'An error occured while resetting password'
        })
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt)
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      return res.status(200).send({
  success: true,
  message: "Password reset successfully",
});

  } catch (e){
    console.log(e)
     return res.status(500).send({
            success : false,
            message : 'An error occured while setting up the resetting the password'
      })
  }
}