const StatusCode = require('http-status-codes');
const { airportRepository } = require('../repositories');
const Apperror = require('../utils/error/App-error');
const AirportRepository = new airportRepository();
async function createAirport(data) {
    try {
        const airport = await AirportRepository.create(data);
        return airport;
    }
    //client side errorHandling
    catch (error) {
        console.log(error);
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
async function getAirports(data) {
    try {
        const Airports = await AirportRepository.getAll(data);
        return Airports;
    }
    catch (error) {

        throw new Apperror("cannot fetch data of all airports", StatusCode.INTERNAL_SERVER_ERROR);

    }
}

async function getAirport(id) {
    try {
        const airport = await AirportRepository.get(id);
        return airport;
    } catch (error) {
        //database level error handling
        if (error.statusCode == StatusCode.NOT_FOUND) {
            throw new Apperror(error.message, error.statusCode);
        }
        //server side errorHandling
        throw new Apperror('Cannot fetch data of the airport', StatusCode.INTERNAL_SERVER_ERROR);
    }
}
async function destroyAirport(id) {
    try {
        const airport= await AirportRepository.destroy(id);
        return airport;
    } catch (error) {
        if (error.statusCode == StatusCode.NOT_FOUND) {
            throw new Apperror(error.message, error.statusCode);
        }
        throw new Apperror('Cannot fetch data of the airport', StatusCode.INTERNAL_SERVER_ERROR);
    }
}
async function updateAirport(id, data) {
    try {
        const airport = await AirportRepository.update(id, data);
        return airport;
    } catch (error) {
        console.log(error);
        //client side error handling
        if (error.name == 'SequelizeValidationError') {
            const explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });

            throw new Apperror(explanation, StatusCode.BAD_REQUEST);
        }
        // database level error handling
        if (error.statusCode == StatusCode.NOT_FOUND) {
            throw new Apperror(error.message, error.statusCode);
        }
        //server side error handling
        throw new Apperror('Cannot fetch data of airport', StatusCode.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}