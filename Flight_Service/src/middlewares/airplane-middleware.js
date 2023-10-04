const {StatusCodes}=require('http-status-codes');
const Apperror=require('../utils/error/App-error');
const {SuccessResponce,ErrorResponse}=require('../utils/common');
function validateCreateRequest(req,res,next){
    if(!req.body.modelNumber){
        const message="something went wrong while creating airplane";
        ErrorResponse.message=message;
        ErrorResponse.error=new Apperror(["model number not found while creating airplane"],StatusCodes.BAD_REQUEST);
        res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);

    }
    next();
}
module.exports={
    validateCreateRequest
}