const { airplaneService } = require('../services');
const StatusCode = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');



async function createAirplane(req, res) {
       try {
              const airplaneInfo = await airplaneService.createAirplane({
                     modelNumber: req.body.modelNumber,
                     capacity: req.body.capacity,
              });
              SuccessResponse.data = airplaneInfo;
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
async function getAirplanes(req, res) {

       try {
              const airplanes = await airplaneService.getAirplanes();
              SuccessResponse.data = airplanes;
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
async function getAirplane(req, res) {
       try {
              const airplane = await airplaneService.getAirplane(req.params.id);
              SuccessResponse.data = airplane;
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
async function destroyAirplane(req, res) {
       try {
              const airplane = await airplaneService.destroyAirplane(req.params.id);
              SuccessResponse.data = airplane;
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
async function updateAirplane(req, res) {
       try {
              const airplane = await airplaneService.updateAirplane(req.params.id, {
                     modelNumber: req.body.modelNumber,
                     capacity: req.body.capacity
              });
              SuccessResponse.data = airplane;
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
       createAirplane,
       getAirplanes,
       getAirplane,
       destroyAirplane,
       updateAirplane
}