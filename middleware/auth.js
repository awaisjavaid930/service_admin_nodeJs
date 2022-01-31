const express = require("express");
const app = express();

function authenticatedRoute(req , res , next)
{
    if (req.originalUrl == '/user/login' || req.originalUrl == '/user/register') {
        next();
    } else {
        if (req.isAuthenticated()) {
            next();
        } else {
            req.flash('error_msg', 'please login first' )
            return res.redirect('/user/login');
        }
    }
}

module.exports = authenticatedRoute ;