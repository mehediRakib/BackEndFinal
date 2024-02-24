
const productModel=require('../model/productModel');
const productCreateService=async(req)=>{
    try{
        const reqBody=req.body;
        const result=await productModel.create(reqBody);
        return {status:"success",data:result};

    }catch (e) {
      return  {status:"fail",data:e.toString()}
    }
}


const productReadService=async (req)=>{
    try{

        const result=await productModel.find();
        return {status:'success',data:result};
    }catch (e) {
        return {status:'fail',data:e.toString()}
    }
}

const productDeleteService=async (req)=>{
    try{
        const reqBody=req.body;
        const result=await productModel.deleteOne(reqBody);
        return {status:'success',data:result};
    }catch (e) {
        return {status:"fail",data:e.toString()};
    }
}

const productUpdateService=async (req)=>{
    try{
        const id=req.params.productID;
        const reqBody=req.body;
        const result=await productModel.updateOne({_id:id},reqBody);
        return {status:"success",data:result};
    }catch (e) {
        return {status:'fail',data:e.toString()}
    }
}

const SingleProductService=async (req)=>{
    try{
        const id=req.params.id;
        const result=await productModel.findOne({_id:id});
        return {status:"success",data:result};
    }catch (e) {
        return {status:"fail",data:e.toString()}

    }
}



module.exports={
    productCreateService,
    productReadService,
    productDeleteService,
    productUpdateService,
    SingleProductService
}
