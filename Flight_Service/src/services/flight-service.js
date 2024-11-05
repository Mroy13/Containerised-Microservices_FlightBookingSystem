const StatusCode = require('http-status-codes');
const { Op } = require('sequelize');
const { flightRepository } = require('../repositories');
const Apperror = require('../utils/error/App-error');

const FlightRepository = new flightRepository();
async function createFlight(data) {
    try {
        const flight = await FlightRepository.create(data);
        return flight;
    }
    //client side errorHandling
    catch (error) {
        if (error.name == 'SequelizeValidationError') {
            const explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });

            throw new Apperror(explanation, StatusCode.BAD_REQUEST);
        }
        //server side error handling
        else {
            throw new Apperror("request not resolved due to server side probelem", StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
}



//filters:trips:BOM-HYD,travellers=2-0-0,date:28072023,price=17644-92534
//sort:price,arivalTime,departureTime,duration

async function getAllflights(query) {
    let customFilter = {};
    let sortFilter=[];
    const endingTriptime=" 23:59:00";
    //trips filter
    if (query.trips) {
        //const airportIds=query.trips.split("-");
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        if (departureAirportId == arrivalAirportId) {
            throw new Apperror("dep id and arival id can not be same", StatusCode.BAD_REQUEST);
        }
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }
    //price filter
    if (query.price) {
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, !maxPrice ? maxprice = 20000 : maxprice],
        }
    }
    //travelers filter
    if (query.travelers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travelers

        }
    }
    
    //datefilter
    //TODO:FIX the timeStamp problem create during sequelize query execution
               //sequelize read wrong date data 
    if(query.tripDate){
        [startDatetime,endDatetime]=query.tripDate.split("_");

             customFilter.departureTime={
                 [Op.between]:[startDatetime,endDatetime],
     }

}
    //sort by  ASC or DESC:

   if(query.sort){
    const params = query.sort.split(',');
    const sortFilters = params.map((param) => param.split('_'));
    sortFilter = sortFilters;
   }

    try {
        const response = await FlightRepository.getAllflights(customFilter,sortFilter);
        return response;
    }
    catch (error) {
        throw new Apperror("request not resolved due to server side probelem", StatusCode.INTERNAL_SERVER_ERROR);
    }
}



async function getFlight(data){
    try{
        const response= await FlightRepository.get(data);
        return response;
    }
    catch(error){
        throw new Apperror("request not resolved due to server side probelem", StatusCode.INTERNAL_SERVER_ERROR);
    }
}



async function updateSeats(id,data){
    try{
           const response=await FlightRepository.updateRemainingseats(id,data.seats,data.dec);
           return response;
    }
    catch(error){
        throw new Apperror("request not resolved due to server side probelem", StatusCode.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createFlight,
    getAllflights,
    getFlight,
    updateSeats

}