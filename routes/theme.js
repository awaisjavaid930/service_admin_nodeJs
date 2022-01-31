const express = require('express');
const router = express.Router();

router.get('/list' , function(req , res){
    return res.render('theme/index');
})

router.get('/create' , function(req , res){
    return res.render('theme/create');
})

module.exports =  router ;