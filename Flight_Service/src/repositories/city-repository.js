const {City}=require('../models');
const crudRepository=require('./crud-repository');
class cityRepository extends crudRepository{
    constructor(){
        super(City);
    }
}

module.exports=cityRepository;