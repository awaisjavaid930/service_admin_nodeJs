const express = require('express');
const router = express.Router();

router.get('/list' , function(req , res) {
    return res.render('role_permission/index');
}) 

router.get('/create' , function(req , res) {
    return res.render('role_permission/create');
}) 

module.exports =  router ;