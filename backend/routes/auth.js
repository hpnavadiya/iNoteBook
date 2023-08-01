const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../Middleware/fetchuser');

const JWT_SECRET = "harsh";

// Part-1 Create a user using: POST "/api/auth/createuser" No login require

// router.post('/createuser', (req, res) => {
//     // Send something into req's body
//     console.log(req.body);
//     // res.send("HEllooo")
//     const user = User(req.body);
//     user.save(); // For the save user into database
//     res.send(req.body);
// });

router.post('/createuser', [ // 2nd argument return empty array
    // Validation using express-validator
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 })
], async (req, res) => {

    let success = false;

    // If there are errors return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array });
    }
    try {
        // Check whether the user exists with the same email
        // method on model for find email
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "The Email already exist" });
        }

        // Hashing
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new user and it will return promise
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        // .then(user => res.json(user))
        // .catch(err => {console.log(err)
        //     res.json({error: 'Please enter a unique value for email', message: err.message});
        // });
        // res.json(user)

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        success = true;
        res.json({ success, authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});
//---------------------------------------------------------------------------------------------------

// Part-2 Authenticate user using: POST "/api/auth/login"

router.post('/login', [ // 2nd argument return empty array
    // Validation using express-validator
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res) => {
    // If there are errors return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array });
    }

    // Destructer get email and pass out from req.body
    const { email, password } = req.body;
    try {

        let success = false;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: "Please try to login with correct credentials" });
        }
        //Compare pass
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, errors: "Please try to login with correct credentials" });
        }
        // if password is correct
        const data = {
            user: { // Object
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});
//---------------------------------------------------------------------------------------------------


// Part-3 Get loggedin user details using: POST "/api/auth/getuser". Login require

router.post('/getuser', fetchuser,async (req, res) => {

    // To get user details we have to send JWT TOKEN
    try {
        // To get user id we have to decode JWT so that we create middleware
        userID = req.user.id;
        //.select will select all the field except password
        const user = await User.findById(userID).select("-password"); // To get user id
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

module.exports = router;