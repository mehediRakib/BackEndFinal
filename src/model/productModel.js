const mongoose=require('mongoose');

const DataSchema=mongoose.Schema(
    {
        name:{type:String,required:true},
        brand:{type:String,required: true},
        category:{type:String,required:true},
        description:{type:String,required:true},
        img:{type:String}
    },
    {timestamps:true,versionKey:false}
)

const productModel=mongoose.model("products",DataSchema);
module.exports=productModel