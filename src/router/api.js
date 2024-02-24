const express=require('express');
const router=express.Router();
const productController=require('../controller/productController')
const userController=require('../controller/userController');
const AuthVerification=require('../middleware/AuthVerification');

router.post('/createProduct',productController.productCreate) ;
router.get('/readProduct',productController.productRead);
router.get('/deleteProduct',productController.productDelete);
router.post('/updateProduct/:productID',productController.productUpdate);
router.get('/product/:id',AuthVerification,productController.SingleProduct);


router.get('/userOTP/:email',userController.OtpRequest);
router.post('/verifyOTP/:email/:otp',userController.OtpVerify);
router.post('/profileChange',AuthVerification,userController.profilePicChange);
router.post('/passwordChange',AuthVerification,userController.PassChange);
router.get('/profile',AuthVerification,userController.profileRequest)
router.get('/logout',AuthVerification,userController.LogoutRequest);
router.post('/login',userController.LoginRequest);
router.get('/profileImage',AuthVerification,userController.ProfilePicRequest);



module.exports=router;