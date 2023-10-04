const { airportService } = require('../services');
const StatusCode = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

/**
 * POST : /airports 
 * req-body {name: 'Rajiv Gandhi International Airport', code:'HYD',address:'Shamshabad',cityId:'3'}
 */

async function createAirport(req, res) {
       try {
              const airportInfo = await airportService.createAirport({
                     name: req.body.name,
                     code: req.body.code,
                     address: req.body.address,
                     cityId: req.body.cityId
              });
              SuccessResponse.data = airportInfo;
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
async function getAirports(req, res) {

       try {
              const airports = await airportService.getAirports();
              SuccessResponse.data = airports;
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
async function getAirport(req, res) {
       try {
              const airport = await airportService.getAirport(req.params.id);
              SuccessResponse.data = airport;
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
async function destroyAirport(req, res) {
       try {
              const airport = await airportService.destroyAirport(req.params.id);
              SuccessResponse.data = airport;
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
async function updateAirport(req, res) {
       console.log(req.params.id);
       try {
              const airport = await airplaneService.updateAirport(req.params.id, {
                     name: req.body.name,
                     code: req.body.code,
                     address: req.body.address,
                     cityId: req.body.cityId
              });
              SuccessResponse.data = airport;
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
       createAirport,
       getAirports,
       getAirport,
       destroyAirport,
       updateAirport
}