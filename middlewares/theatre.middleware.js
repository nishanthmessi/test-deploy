const { errorResponseBody } = require('../utils/responsebody');

const validateTheatreCreateRequest = async (req, res, next) => {
    if(!req.body.name) {
        errorResponseBody.err = "The name of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody)
    }

    if(!req.body.pincode) {
        errorResponseBody.err = "The pincode of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody);
    }

    if(!req.body.city) {
        errorResponseBody.err = "The city of the theatre is not present";
        return res.status(400).json(errorResponseBody);
    }
    next();
}

const validateUpdateMoviesRequest = async (req, res, next) => {
    if(req.body.insert == undefined) {
        errorResponseBody.err = "The insert parameter is missing in the request";
        return res.status(400).json(errorResponseBody);
    }

    if(!req.body.movieIds) {
        errorResponseBody.err = "No movies present in the request to be updated in theatre";
        return res.status(400).json(errorResponseBody);
    }

    if(!(req.body.movieIds instanceof Array)) {
        errorResponseBody.err = "Expected array of movies but found something else";
        return res.status(400).json(errorResponseBody);
    }

    if(req.body.movieIds.length == 0) {
        errorResponseBody.err = "No movies present in the array provided";
        return res.status(400).json(errorResponseBody);
    }
    next();
}

module.exports = {
    validateTheatreCreateRequest,
    validateUpdateMoviesRequest
}