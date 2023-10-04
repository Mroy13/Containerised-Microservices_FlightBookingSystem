const {Airport}=require('../models');
const crudRepository=require('./crud-repository');
class airportRepository extends crudRepository{
    constructor(){
        super(Airport);
    }
}

module.exports=airportRepository;