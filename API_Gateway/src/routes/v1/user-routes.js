const express=require('express');
const {userController}=require ('../../controllers');
const {userMiddleware}=require('../../middlewares');
 const router=express.Router();
 router.post('/signup',userMiddleware.validateUser,userController.createUser);
 router.post('/signin',userMiddleware.validateUser,userController.userSignin);
// router.get('/',Controller.get);
// router.get('/:id',Controller.get);
module.exports=router