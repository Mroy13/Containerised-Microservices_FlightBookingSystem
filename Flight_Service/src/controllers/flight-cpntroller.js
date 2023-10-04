const { flightService } = require('../services');
const StatusCode = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

/**
 * POST : /flights
 * req-body: {flightNumber:'AIC217',airplaneId:'33',departureAirportId:'HYD',arrivalAirportId:'DEL'
 * arrivalTime:'2023-07-26 4:50:00',departureTime:'2023-07-26 1:30:00',price:'6000',boardingGate:'20A',totalSeats:'150'
 *  
 * }
 */

async function createFlight(req, res) {
       try {
              const flightInfo = await flightService.createFlight({
                     flightNumber: req.body.flightNumber,
                     airplaneId: req.body.airplaneId,
                     departureAirportId: req.body.departureAirportId,
                     arrivalAirportId: req.body.arrivalAirportId,
                     arrivalTime: req.body.arrivalTime,
                     departureTime: req.body.departureTime,
                     price: req.body.price,
                     boardingGate: req.body.boardingGate,
                     totalSeats: req.body.totalSeats

              });
              SuccessResponse.data = flightInfo;
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

async function getAllflights(req, res) {

       try {
              const flights = await flightService.getAllflights(req.query);
              SuccessResponse.data = flights;
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


async function getFlight(req, res) {
       try {
              const flight = await flightService.getFlight(req.params.id);
              SuccessResponse.data = flight;
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

async function updateSeats(req, res) {
       try {
              const updateres = await flightService.updateSeats(req.params.id, req.body);
              SuccessResponse.data = updateres;
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
       createFlight,
       getAllflights,
       getFlight,
       updateSeats
}