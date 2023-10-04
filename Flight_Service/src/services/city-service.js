const StatusCode = require('http-status-codes');
const { cityRepository } = require('../repositories');
const Apperror = require('../utils/error/App-error');

const CityRepository = new cityRepository();
async function createCity(data) {
    try {
        const city = await CityRepository.create(data);
        return city;
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
async function getCities(data) {
    try {
        const Cities = await CityRepository.getAll(data);
        return Cities;
    }
    catch (error) {

        throw new Apperror("cannot fetch data of all cities", StatusCode.INTERNAL_SERVER_ERROR);

    }
}

async function getCity(id) {
    try {
        const city = await CityRepository.get(id);
        return city;
    } catch (error) {
        //database level error handling
        if (error.statusCode == StatusCode.NOT_FOUND) {
            throw new Apperror(error.message, error.statusCode);
        }
        //server side errorHandling
        throw new Apperror('Cannot fetch data of the city', StatusCode.INTERNAL_SERVER_ERROR);
    }
}
async function destroyCity(id) {
    try {
        const city = await CityRepository.destroy(id);
        return city;
    } catch (error) {
        if (error.statusCode == StatusCode.NOT_FOUND) {
            throw new Apperror(error.message, error.statusCode);
        }
        throw new Apperror('Cannot fetch data of the city', StatusCode.INTERNAL_SERVER_ERROR);
    }
}
async function updateCity(id, data) {
    try {
        const city = await CityRepository.update(id, data);
        console.log(city);
        return city;
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
        throw new Apperror('Cannot fetch data of city', StatusCode.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createCity,
    getCities,
    getCity,
    destroyCity,
    updateCity
}