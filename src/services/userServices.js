
const userModel=require('../model/userModel');
const EmailSend = require("../utility/emailHelper");
const {EncodeToken} = require("../utility/TokenHelper");
const profileModel=require('../model/profileModel');
const mongoose=require('mongoose');
const ObjectID=mongoose.Types.ObjectId;
const bcrypt=require('bcryptjs');
const {compare} = require("bcrypt");


const userOTPService=async (req)=>{
  try{
      const email=req.params.email;
      const code=Math.floor(100000+Math.random()*900000);
      const text=`Your Otp code is:${code}`;
      const Subject="Email verification";
      const total=await userModel.find({email:email,otp:'0'}).count('total')
      if(total===1){
          return {status:'exist',message:"Already have an account"}
      }
      else{
          await EmailSend(email,text,Subject);
          await userModel.updateOne({email:email},{$set:{otp:code}},{upsert:true});
          return {status:"success", message:"6 digit otp has been send"}
      }
  }catch (e) {
      return {status:"fail",message:e.toString()}
  }
}

const verifyLoginService=async (req)=>{
    const email=req.params.email;
    const otp=req.params.otp;
    const reqBody=req.body;
    let total=await  userModel.find({email:email,otp:otp}).count('total')
    if(total===1){
        let user_id=await userModel.find({email:email}).select('_id');
        reqBody.otp='0';


        //secured password by hashing algorithm>>>> i am using it in another project..
        // const salt=await bcrypt.genSalt(10);
        // const secretPass=await bcrypt.hash(reqBody.password,salt);
        // reqBody.password=secretPass;

          let token=await EncodeToken(email,user_id);
          await userModel.updateOne({email:email},{$set:reqBody});
          return {status:"success",token:token};
    }
    else {
        return {status:"fail",data:"invalid otp"}
    }
}

const passWordChangeService=async (req)=>{
    try{
        let user_id=req.headers['user_id'];
        let reqBody=req.body;
        let result=await userModel.updateOne({_id:user_id},{$set:reqBody},{upsert:true});
        return {status:'success',data:result};
    }catch (e) {
        return {status:"fail",data:e.toString()};
    }
}

const profilePicChangeService=async (req)=>{
    try{
        let user_id=req.headers['user_id'];
        let reqBody=req.body;
        let result=await profileModel.updateOne({_id:user_id},{$set:reqBody},{upsert:true});
        return {status:'success',data:result};
    }catch (e) {
        return  {status:"fail",data:"Something went wrong"};
    }
}


const ReadProfileService=async (req)=>{
    try{
        let user_ID=req.headers.user_id;
        let data=await userModel.find({_id:user_ID})
        return {status:'success',data:data};
    }catch (e) {
        return {status:'fail',data:"Something went wrong"}
    }

},

    readProfileImageService=async (req)=>{
    try{
        let userId=req.headers.user_id;
        let data=await profileModel.find({_id:userId});
        return {status:"success",data:data}
    }catch (e) {
        return {status:'fail',data:"something went wrong"}
    }
}

// const userLoginService = async (req) => {
//     let reqBody = req.body;
//
//     // Retrieve the hashed password from the database based on the provided email
//     const user = await userModel.find({ email: reqBody.email });
//
//     if (user) {
//         // Compare the entered password with the stored hashed password
//         // const passwordMatch = await bcrypt.compare(reqBody.password, user.password);
//         const passwordMatch=await compare(reqBody.password,user.password);
//
//         if (passwordMatch) {
//             // If passwords match, proceed to generate a token
//             let user_id = user._id;
//             let token = await EncodeToken(reqBody.email, user_id);
//             return { status: "success", token: token };
//         } else {
//             return { status: "fail", data: "Invalid email or Password" };
//         }
//     } else {
//         return { status: "fail", data: "Invalid email or Password" };
//     }
// };

const userLoginService=async (req)=>{
    try{
        const reqBody=req.body;
        const total=await userModel.find(reqBody).count('total');
        if(total===1){
            let user_id=await userModel.find({email:reqBody.email}).select('_id');
            const token=await EncodeToken(reqBody.email,user_id);
            return {status:"success",data:"Successfully Log in",token:token}
        }
        else
        {
            return {status:"fail",data:"Invalid User"}
        }
    }
    catch (e) {
        return {status:"fail",data:"Something went wrong"}
    }
}



module.exports={
    userOTPService,
    verifyLoginService,
    passWordChangeService,
    profilePicChangeService,
    ReadProfileService,
    userLoginService,
    readProfileImageService
}