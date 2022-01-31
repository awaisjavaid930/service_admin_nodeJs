const express = require('express');
const router = express.Router();

router.get('/list' ,  function(req, res){
    return res.render('coupon/index');
})

router.get('/create' ,  function(req, res){
    return res.render('coupon/create');
})


module.exports = router ;