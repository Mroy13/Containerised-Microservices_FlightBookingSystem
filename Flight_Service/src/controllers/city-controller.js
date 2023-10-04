const { cityService } = require('../services');
const StatusCode = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

/**
 * POST : /cities 
 * req-body {name: 'London'}
 */
async function createCity(req, res) {
       try {
              const cityInfo = await cityService.createCity({
                     name: req.body.name,
              });
              SuccessResponse.data = cityInfo;
              return res
                     .status(StatusCode.CREATED)
                     .json(SuccessResponse);
       }
       catch (error) {

              ErrorResponse.error = error;
              return res
                     .status(error.statusCode)
                     .json(ErrorResponse);
       }


}
async function getCities(req, res) {

       try {
              const cities = await cityService.getCities();
              SuccessResponse.data = cities;
              return res
                     .status(StatusCode.OK)
                     .json(SuccessResponse);
       }
       catch (error) {

              ErrorResponse.error = error;
              return res
                     .status(error.statusCode)
                     .json(ErrorResponse);
       }


}
async function getCity(req, res) {
       try {
              const city = await cityService.getCity(req.params.id);
              SuccessResponse.data = city;
              return res
                     .status(StatusCode.OK)
                     .json(SuccessResponse);
       }
       catch (error) {

              ErrorResponse.error = error;
              return res
                     .status(error.statusCode)
                     .json(ErrorResponse);
       }


}
async function destroyCity(req, res) {
       try {
              const response = await cityService.destroyCity(req.params.id);
              SuccessResponse.data = response;
              return res
                     .status(StatusCode.OK)
                     .json(SuccessResponse);
       }
       catch (error) {

              ErrorResponse.error = error;
              return res
                     .status(error.statusCode)
                     .json(ErrorResponse);
       }


}
async function updateCity(req, res) {
       try {
              const response = await cityService.updateCity(req.params.id, {
                     name: req.body.name,
              });
              SuccessResponse.data = response;
              return res
                     .status(StatusCode.OK)
                     .json(SuccessResponse);
       }
       catch (error) {
              ErrorResponse.error = error;
              return res
                     .status(error.statusCode)
                     .json(ErrorResponse);
       }


}

module.exports = {
       createCity,
       getCities,
       getCity,
       destroyCity,
       updateCity
}