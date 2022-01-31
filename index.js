const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport')
const User = require('./models/user');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash');
const session = require('express-session')
const app = express();
const authenticatedRoute = require('./middleware/auth')

mongoose.connect('mongodb://localhost:27017/service' , () => {
    console.log("Database Connection");
});

app.use(require('body-parser').urlencoded({ extended: true }));
app.set('view engine' , 'ejs');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());
app.use(function(req,res,next){
    res.locals.sucess_msg   = req.flash(('sucess_msg'));
    res.locals.error_msg    = req.flash(('error_msg'));
    res.locals.error        = req.flash(('error')); // always same
    res.locals.currentUser  = req.user;
    next();
})

app.use(authenticatedRoute);

const userRoute = require('./routes/auth');
const providerRoute = require('./routes/provider_service');
const bookingRouter = require('./routes/booking');
const couponRouter = require('./routes/coupon');
const themeRouter = require('./routes/theme');
const roleRouter = require('./routes/role');
app.use('/user',userRoute);
app.use('/provider', providerRoute);
app.use('/booking', bookingRouter);
app.use('/coupon' , couponRouter);
app.use('/theme' ,  themeRouter);
app.use('/role',roleRouter);


app.get('*' , function(req,res){
    return res.redirect('/user/login');
})

app.listen('3000',() => {
    console.log("Connection");
})