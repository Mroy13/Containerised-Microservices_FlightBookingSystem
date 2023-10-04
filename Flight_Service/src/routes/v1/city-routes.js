const express=require('express');
const {CityController}=require ('../../controllers');
//const {CityMiddlewares}=require('../../middlewares');
const router=express.Router();

router.post('/',CityController.createCity);
router.get('/',CityController.getCities);
router.get('/:id',CityController.getCity);
router.delete('/:id',CityController.destroyCity);
router.put('/:id',CityController.updateCity);
module.exports=router