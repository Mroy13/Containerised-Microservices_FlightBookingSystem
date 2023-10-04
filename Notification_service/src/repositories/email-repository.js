const {modelname}=require('../models');
const crudRepository=require('./crud-repository');
class modelnameRepository extends crudRepository{
    constructor(){
        super();
    }
}

module.exports=modelnameRepository;