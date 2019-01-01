const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

// @route       GET api/users/test
// @desc        Tests users route
// @access      Public
router.get('/test', (req, res) => res.json({msg: "Users Works"}));

// @route       GET api/users/register
// @desc        Register user
// @access      Public
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if(!isValid) {
        //validation failed
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',   // Size
                    r: 'pg',    // Rating
                    d: 'mm'     // Default
                });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            //this returns the new MongoDB document as json
                            .catch(err => console.log(err));
                    })
                })
            }
        })
});

// @route       GET api/users/login
// @desc        Login User / Returning Token
// @access      Public
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if(!isValid) {
        //validation failed
        return res.status(400).json(errors);
    }


    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({email: email})
        .then(user => {
            //Check for user
            if(!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }

            // Check Password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        // User Matched
                        const payload = { id: user.id, name: user.name, avatar: user.avatar} //create JWT payload
                        // Sign Token
                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600}, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        });
                        //payload: object containing user information from req
                        //keys.secretOrKey: random string from the server for validation from server
                        //{ expiresIn: 3600:} token expires in an hour *3600 seconds equals an hour*

                        /*
                        {
                            "success": true,
                            "token": "Bearer                        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMmE4NDdlYzg3ZThhNDNjOGE5Mzhm        MiIsIm5hbWUiOiJKYW1lcyBQYXJrIiwiYXZhdGFyIjoiLy93d3cuZ3JhdmF0YXIuY29tL2F2YXRhc                     i83M2ZiNTQ0OWY0NmM0MjNiMmVmZWQwZjViYzdiMTQxOD9zPTIwMCZyPXBnJmQ9bW0iLCJpYXQiOj                      E1NDYyOTE4MjYsImV4cCI6MTU0NjI5NTQyNn0.              w3yKkOwys1YODMYYKyesfOv1DYPlP-iDHifJEKKRl_c"
                        }
                        The token will be used in the header of url requests to validate and identify the user for access to user privileges
                        */



                    } else {
                        errors.password = 'Password is incorrect';
                        return res.status(400).json(errors);
                    }
                });
        });
});

//  @route          GET api/users/current
//  @desc           Return current user 
//  @access         Private

//passport config is set up and initialized in the server.js 
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;