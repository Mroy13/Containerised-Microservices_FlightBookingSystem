const express=require('express');
const { infoController} = require('../../controllers');
const {userMiddleware}=require('../../middlewares');
const userRoutes=require('./user-routes');
const router=express.Router();
router.use('/user',userRoutes);
router.get('/info',infoController.info);
router.get('/chcekAuthn',userMiddleware.checkAuth,infoController.info);
router.get('/chcekAuthz',userMiddleware.checkAuth,userMiddleware.isAdmin,infoController.info);

module.exports=router;
