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
                req.flash('error_msg', err.message )
                return res.redirect('/user/register');
            }
            if (user){
                req.flash('sucess_msg', "Register successfully" )
                return res.redirect('/user/login');   
            }
            // passport.authenticate('local')(req,res,() => {
                // req.flash('sucess_msg', "Register successfully" )
                // return res.redirect('/user/login');
            // });
        });    
    } catch (error) {
        return res.status(404);
    }    
})

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/user/login', failureFlash: 'invalid username or password' }),
  function(req, res) {
    return res.send('/user/dashboard');
});

router.get('/dashboard' , function(req , res ) {
    req.flash('sucess_msg', "Login Successfully" )
    return res.render('dashboard/index');
})

module.exports = router;