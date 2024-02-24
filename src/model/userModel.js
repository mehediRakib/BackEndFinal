const mongoose=require('mongoose');

const DataSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required: true},
    mobile:{type:String,required:true},
    password:{type:String,required:true},
    otp:{type:String,required:true}
},
    {
        versionKey:false,timestamps:true
    }
    )

const userModel=mongoose.model("users",DataSchema);

module.exports=userModel;

