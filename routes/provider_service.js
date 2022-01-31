const express = require('express');
const router = express.Router();

router.get('/list' , function(req , res ){
    return res.render('provider_service/index');
})

router.get('/service/list' , function(req , res ){
    return res.render('provider_service/services');
})


router.get('/create' , function(req , res ){
    return res.render('provider_service/index');
})


module.exports = router ;