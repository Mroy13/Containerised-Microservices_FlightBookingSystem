const { Sequelize } = require('sequelize');
const { Flight, Airplane, Airport } = require('../models');
const crudRepository = require('./crud-repository');
const db=require('../models');
const {addRowLockOnFlights}=require('./queries');
class flightRepository extends crudRepository {
    constructor() {
        super(Flight);
    }
    async getAllflights(filter, sortFilter) {
        console.log(filter);
        const response = await Flight.findAll({
            where: filter,
            order: sortFilter,
            include: [{
                model: Airplane,
                as:'airplaneDetails',
                required: true,
            },

              {
                  model: Airport,
                  as: 'arrivalAirport',
                  required: true,
                  on: {
                      col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                  }
              },

             {
                 model: Airport,
                 as:'departureAirport',
                 required: true,
                 on: {
                     col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))
                 }
             },

            ]
        });
        return response;
    }

    async updateRemainingseats(flightId,seats,dec=true){
          const t=await db.sequelize.transaction();
          try{
            //row lock for update seat
            await db.sequelize.query(addRowLockOnFlights(flightId));
            const flight=await Flight.findByPk(flightId);
          if(+dec){
            await flight.decrement({
                'totalSeats': seats,
              },{ transaction: t});
          }
          else{
            await flight.increment({
                'totalSeats': seats,
              },{ transaction: t });
          }
            await t.commit();
            return flight;
            
          }
          catch(error){
            await t.rollback();
            throw error;
          }
    }

}

module.exports = flightRepository;