const express = require("express");
const app = express();

function authenticatedRoute(req , res , next)
{
    if(req.originalUrl == '/user/login'){
        next();
    }else{
        if (req.isAuthenticated()) {
            next();
        }else{
            return res.redirect('/user/login');
        }
    }
}

module.exports = authenticatedRoute ;