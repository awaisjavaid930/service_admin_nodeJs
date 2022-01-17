const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport')
const User = require('./models/user');
var LocalStrategy = require('passport-local');

mongoose.connect('mongodb://localhost:27017/service' , () => {
    console.log("Database Connection");
});

app.use(require('body-parser').urlencoded({ extended: true }));


app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine' , 'ejs');

const useRoute = require('./routes/auth');
app.use('/user',useRoute);

app.get('*' , function(req,res){
    return res.redirect('/user/login');
})

app.listen('3000',() => {
    console.log("Connection");
})