const Validator = require('validator');
const isEmptyCustomized = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    //set empty defaults to avoid generating errors during the test section
    data.name = !isEmptyCustomized(data.name) ? data.name : '';
    data.email = !isEmptyCustomized(data.email) ? data.email : '';
    data.password = !isEmptyCustomized(data.password) ? data.password : '';
    data.password2 = !isEmptyCustomized(data.password2) ? data.password2 : '';
    

    if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
        // this should trigger if test condition fails
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

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

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        // this should trigger if test condition fails
        errors.password = 'Password must be at least 6 characters';
    }

    if(Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password field is required';
    }

    if(!Validator.equals(data.password, data.password2) ) {
        // this should trigger if test condition fails
        errors.password2 = 'Passwords must match';
    }

    return {
        errors: errors,
        isValid: isEmptyCustomized(errors)
    }
}