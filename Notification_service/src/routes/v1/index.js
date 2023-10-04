const express=require('express');
const { infoController} = require('../../controllers');
const Routes=require('./routesname-routes');
const router=express.Router();
router.use('/',Routes);
router.get('/info',infoController.info);
module.exports=router;
