const {userOTPService, verifyLoginService, passWordChangeService, profileService,
    profilePicChangeService, userLoginService, ReadProfileService, readProfileImageService
} = require("../services/userServices");


exports.OtpRequest=async (req,res)=>{
    let data=await userOTPService(req);
    res.status(200).json(data);
}

exports.OtpVerify=async (req,res)=>{
   try{
       let result=await verifyLoginService(req);
       if(result['status']==="success"){
           let cookieExpire={expires:new Date(Date.now()+24*60*60*1000),httponly:false}
           res.cookie('token',result['token'],cookieExpire)
       }
       res.status(200).json(result);
   }catch (e) {
       res.status(200).json(result)
   }
}

exports.PassChange=async (req,res)=>{
    let data=await passWordChangeService(req);
    res.status(200).json(data);
}

exports.profilePicChange=async (req,res)=>{
    let data=await profilePicChangeService(req);
    res.status(200).json(data);
}

exports.profileRequest=async (req,res)=>
{
    let data=await ReadProfileService(req);
    res.status(200).json(data);
}

exports.ProfilePicRequest=async (req,res)=>{
    let data=await readProfileImageService(req);
    res.status(200).json(data);
}

exports.LogoutRequest=async (req,res)=>{
    let cookieOption={expires: new Date(Date.now()-24*60*60*1000),httponly: false};
    res.cookie('token',"",cookieOption)
    return res.status(200).json({status: "success"});
}

exports.LoginRequest=async (req,res)=>{
    try{
        let data=await userLoginService(req);
        if(data['status']==='success'){
            let cookieOption={expires:new Date(Date.now()+24*60*60*1000),httponly:false};
            res.cookie('token',data['token'],cookieOption);
            res.status(200).json(data)

        }
    }catch (e) {
        res.status(200).json(e.toString());
    }
}
