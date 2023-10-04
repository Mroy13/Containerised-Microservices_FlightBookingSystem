const {Airplane}=require('../models');
const crudRepository=require('./crud-repository');
class airplaneRepository extends crudRepository{
    constructor(){
        super(Airplane);
    }
}

module.exports=airplaneRepository;