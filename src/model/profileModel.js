const mongoose=require('mongoose');

const DataSchema=mongoose.Schema(
    {
        userID:{type:mongoose.Schema.Types.ObjectId,required:true},
        img:{type:String}
    }
    ,{
        timestamps:true,
        versionKey:false
    }
)
const profileModel=mongoose.model("profiles",DataSchema);
module.exports=profileModel;