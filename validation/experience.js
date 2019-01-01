const Validator = require('validator');
const isEmptyCustomized = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    //set empty defaults to avoid generating errors during the test section
    data.title = !isEmptyCustomized(data.title) ? data.title : '';
    data.company = !isEmptyCustomized(data.company) ? data.company : '';    
    data.from = !isEmptyCustomized(data.from) ? data.from : '';    

    if(Validator.isEmpty(data.title)) {
        errors.title = 'Job title field is required';
    }

    if(Validator.isEmpty(data.company)) {
        errors.company = 'Company field is required';
    }

    if(Validator.isEmpty(data.from)) {
        errors.from = 'From date field is required';
    }

    return {
        errors: errors,
        isValid: isEmptyCustomized(errors)
    }
}