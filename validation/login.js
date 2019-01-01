const Validator = require('validator');
const isEmptyCustomized = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    //set empty defaults to avoid generating errors during the test section
    data.email = !isEmptyCustomized(data.email) ? data.email : '';
    data.password = !isEmptyCustomized(data.password) ? data.password : '';    

    if(!Validator.isEmail(data.email)) {
        // this should trigger if test condition fails
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors: errors,
        isValid: isEmptyCustomized(errors)
    }
}