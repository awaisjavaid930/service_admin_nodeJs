const express   = require("express");
const router    = express.Router();
const passport  = require("passport");
const User      = require('../models/user');

router.get('/login' , (req , res ) =>{
    return res.render('auth/login');
})

router.get('/register' , (req , res ) =>{
    return res.render('auth/register');
})

router.post('/store' , (req , res ) =>{
    try {
        let {name , username , password } = req.body;
        let userData = {
            name : name,
            status : "inactive",
            username : username,
        }
        User.register( userData, password , function(err, user) {
            if (err) { 
                return res.redirect('/register');
            }
            passport.authenticate('local')(req,res,() => {
                return res.redirect('/login');
            });
        });    
    } catch (error) {
        return res.status(404);
    }    
})

module.exports = router;