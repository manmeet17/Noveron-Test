var express = require('express');
var router = express.Router();
var Tenant = require('../models/Tenant');

/* GET home page. */
router.get('/', function(req, res, next) {

  Tenant.find({}, (err, results) =>{
    if(results){
      res.render('index', {
        data: results
      });
    } else {
        res.status(404).json({
            message: "Nothing Found"
        });
    }
});



});

module.exports = router;
