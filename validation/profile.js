const Validator = require('validator');
const isEmptyCustomized = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    //set empty defaults to avoid generating errors during the test section
    data.handle = !isEmptyCustomized(data.handle) ? data.handle : '';
    data.status = !isEmptyCustomized(data.status) ? data.status : '';    
    data.skills = !isEmptyCustomized(data.skills) ? data.skills : '';    

    if(!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to between 2 and 4 characters';
    }

    if(Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    }
    //handle is used to provide a public url route to view profiles for guest viewers
    //http://localhost:5000/api/profile/handle/jamespark --> show jamespark profile for guest viewers

    if(Validator.isEmpty(data.status)) {
        errors.status = 'Status field is required';
    }

    if(Validator.isEmpty(data.skills)) {
        errors.skills = 'Skills field is required';
    }

    if(!isEmptyCustomized(data.website)) {
        if(!Validator.isURL(data.website)) {
            errors.website = 'Not a valid URL';
        }
    }

    if(!isEmptyCustomized(data.youtube)) {
        if(!Validator.isURL(data.youtube)) {
            errors.youtube = 'Not a valid URL';
        }
    }

    if(!isEmptyCustomized(data.twitter)) {
        if(!Validator.isURL(data.twitter)) {
            errors.twitter = 'Not a valid URL';
        }
    }

    if(!isEmptyCustomized(data.facebook)) {
        if(!Validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL';
        }
    }

    if(!isEmptyCustomized(data.linkedin)) {
        if(!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not a valid URL';
        }
    }

    if(!isEmptyCustomized(data.instagram)) {
        if(!Validator.isURL(data.instagram)) {
            errors.instagram = 'Not a valid URL';
        }
    }

    return {
        errors: errors,
        isValid: isEmptyCustomized(errors)
    }
}