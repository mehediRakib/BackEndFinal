const {productCreateService, productReadService, productDeleteService, productUpdateService, SingleProductService} = require("../services/productService");

exports.productCreate=async (req, res) => {
    let data = await productCreateService(req);
    res.status(200).json(data);
}

exports.productRead=async (req,res)=>{
    let data=await productReadService();
    res.status(200).json(data);
}

exports.productDelete=async (req,res)=>{
    let data=await productDeleteService(req);
    res.status(200).json(data);
}

exports.productUpdate=async (req,res)=>{
    let data=await productUpdateService(req);
    res.status(200).json(data);
}

exports.SingleProduct=async (req,res)=>{
    let data=await SingleProductService(req);
    res.status(200).json(data);
}