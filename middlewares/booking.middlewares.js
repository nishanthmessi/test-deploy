const { STATUS, USER_ROLE, BOOKING_STATUS } = require('../utils/constants');
const { errorResponseBody } = require('../utils/responsebody');
const ObjectId = require('mongoose').Types.ObjectId;

const theatreService = require('../services/theatre.service');
const userService = require('../services/user.service');

const validateBookingCreateRequest = async (req, res, next) => {
    if(!req.body.theatreId) {
        errorResponseBody.err = "No theatre id provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(!ObjectId.isValid(req.body.theatreId)) {
        errorResponseBody.err = "Invalid theatreid provided" 
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    const theatre = await theatreService.getTheatre(req.body.theatreId);
    if(!theatre) {
        errorResponseBody.err = "No theatre found for the given id";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }

    if(!req.body.movieId) {
        errorResponseBody.err = "No movie id present";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(!ObjectId.isValid(req.body.movieId)) {
        errorResponseBody.err = "Invalid movie id format";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    console.log(theatre.movies.indexOf(req.body.movieId), req.body.movieId);
    if(theatre.movies.indexOf(req.body.movieId) == -1) {
        errorResponseBody.err = "Given movie is not available in the requested theatre";
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }

    if(!req.body.timing) {
        errorResponseBody.err = "No movie timing passed";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    if(!req.body.noOfSeats) {
        errorResponseBody.err = "No seat provided";
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }
    next();

}

const canChangeStatus = async (req, res, next) => {
    const user = await userService.getUserById(req.user);
    if(user.userRole == USER_ROLE.customer && req.body.status && req.body.status != BOOKING_STATUS.cancelled) {
        errorResponseBody.err = "You are not allowed to change the booking status";
        return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
    }
    next();
}

module.exports = {
    validateBookingCreateRequest,
    canChangeStatus
}