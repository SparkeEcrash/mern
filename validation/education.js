const Validator = require('validator');
const isEmptyCustomized = require('./is-empty');

module.exports = function validateExperienceInput(data) {
    let errors = {};

    //set empty defaults to avoid generating errors during the test section
    data.school = !isEmptyCustomized(data.school) ? data.school : '';
    data.degree = !isEmptyCustomized(data.degree) ? data.degree : '';    
    data.fieldofstudy = !isEmptyCustomized(data.fieldofstudy) ? data.fieldofstudy : '';    
    data.from = !isEmptyCustomized(data.from) ? data.from : '';    

    if(Validator.isEmpty(data.school)) {
        errors.school = 'School field is required';
    }

    if(Validator.isEmpty(data.degree)) {
        errors.degree = 'Degree field is required';
    }

    if(Validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = 'Field of study field is required';
    }

    if(Validator.isEmpty(data.from)) {
        errors.from = 'From date field is required';
    }

    return {
        errors: errors,
        isValid: isEmptyCustomized(errors)
    }
}