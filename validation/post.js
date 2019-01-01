const Validator = require('validator');
const isEmptyCustomized = require('./is-empty');

module.exports = function validatePostInput(data) {
    let errors = {};

    //set empty defaults to avoid generating errors during the test section
    data.text = !isEmptyCustomized(data.text) ? data.text : '';

    if(!Validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = 'Post must be between 10 and 300 characters';
    }

    if(Validator.isEmpty(data.text)) {
        errors.text = 'Text field is required';
    }

    return {
        errors: errors,
        isValid: isEmptyCustomized(errors)
    }
}