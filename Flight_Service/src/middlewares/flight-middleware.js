const {StatusCodes}=require('http-status-codes');
const dateTimehelper=require('../utils/helpers/date-time-helper');
const Apperror=require('../utils/error/App-error');
const {SuccessResponce,ErrorResponse}=require('../utils/common');
function validateCreateRequest(req,res,next){
    if(!req.body.flightNumber){
        const message="something went wrong while creating flight";
        ErrorResponse.message=message;
        ErrorResponse.error=new Apperror(["flight number not found while creating flight"],StatusCodes.BAD_REQUEST);
        res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);

    }
    
  if(!(dateTimehelper.checkDatetime(req.body.arrivalTime,req.body.departureTime))){
    const message="something went wrong while creating flight";
    ErrorResponse.message=message;
    ErrorResponse.error=new Apperror(["arivalTime is less then departureTime"],StatusCodes.BAD_REQUEST);
    res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);

}
    next();
}

module.exports={
    validateCreateRequest
}