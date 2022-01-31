const express = require('express');

const router = express.Router();

router.get('/list' , function (req , res) {
    
    return res.render('booking/index');
})


router.get('/create' , function (req , res) {
    return res.render('booking/create');
})


module.exports = router ;