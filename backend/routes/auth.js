const express = require('express');
const User = require('../models/Users')
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "HElloAni$h";

// Route 1: making a Post request 
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter aleast 5 character').isLength({ min: 5 })
],
    // if there are errors, return bad request and the error
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        //Check weather the email exist already
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, error: "Sorry a user with this email already exist" })
            }
            // Securing Password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            //Creating a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            
            // res.json(user)
            success = true;
            res.json({ success, authtoken });
            
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Internal Server error occured")
        }
        // .then(user => res.json(user))
        // .catch(err=> {console.log(err)
        // res.json({error: 'Please enter the valid value',message: err.message})})
    })
    // Route 2: Authenticating a user, No login required.    
    router.post('/login', [
        body('email').isEmail(),
        body('password').exists()
    ], async (req, res) => {
        let success = false;
        // if there are errors, return bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const {email,password} = req.body;
        try {
            let user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({ error: "Please try to login with correct info" })
            }
            
            const passwordCompare = bcrypt.compare(password,user.password);
            if(!passwordCompare){
                success = false;
                return res.status(400).json({ success, error: "Please try to login with correct info" })
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            console.log(user.id)
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true
    res.json({ success, authtoken });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server error occured")
    }
})

//Route 3: Get loggedin User Details using: POST "api/auth/getuser". Login required
router.post('/getuser', fetchuser ,async (req, res) => {
try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server error occured")
}
})
module.exports = router;