const express = require('express');
const router = express.Router();

//mongo
const User = require('./../models/User');

//password handler
const bcrypt = require('bcrypt'); // Corrected the typo in 'bcrypt'

// Middleware to parse JSON and URL-encoded data
router.use(express.json()); // To parse JSON data
router.use(express.urlencoded({ extended: true })); // To parse URL-encoded 

// signup
router.post('/signup', (req, res) => {
    let { name, email, password, dateOfBirth } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();

    if (name === "" || email === "" || password === "" || dateOfBirth === "") { // Changed '==' to '===' for strict equality
        res.json({
            status: "Failed",
            message: "Empty Input Fields!"
        });
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
        res.json({
            status: "Failed",
            message: "Invalid name entered"
        });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[a-zA-Z]{2,4}$/.test(email)) { // Corrected the email regex
        res.json({
            status: "Failed",
            message: "Invalid email entered"
        });
    } else if (isNaN(Date.parse(dateOfBirth))) { // Corrected dateOfBirth validation
        res.json({
            status: "Failed",
            message: "Invalid date of birth entered"
        });
    } else if (password.length < 8) {
        res.json({
            status: "Failed",
            message: "Password is too short"
        });
    } else {
        User.findOne({ email }) // Changed 'find' to 'findOne' to check if the user exists
            .then(user => {
                if (user) {
                    res.json({
                        status: "Failed",
                        message: "User with the provided email already exists"
                    });
                } else {
                    // Create a new user
                    const saltRounds = 10;
                    bcrypt.hash(password, saltRounds)
                        .then(hashedPassword => {
                            const newUser = new User({ // Changed 'const new User' to 'const newUser'
                                name,
                                email,
                                password: hashedPassword,
                                dateOfBirth
                            });

                            newUser.save()
                                .then(result => {
                                    res.json({
                                        status: "Success",
                                        message: "Signup successful",
                                        data: result,
                                    });
                                })
                                .catch(err => {
                                    res.json({
                                        status: "Failed",
                                        message: "Error occurred while saving user account!"
                                    });
                                });
                        })
                        .catch(err => {
                            res.json({
                                status: "Failed",
                                message: "Error occurred while hashing password"
                            });
                        });
                }
            })
            .catch(err => {
                console.log(err);
                res.json({
                    status: "Failed",
                    message: "An error occurred while checking existing user"
                });
            });
    }
});

//signin
router.post('/signin', (req, res) => {
    // Add the logic for user sign-in here
});

module.exports = router;
