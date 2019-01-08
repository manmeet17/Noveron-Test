var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Tenant = require('../models/Tenant');

router.get('/all' ,(req, res) =>{
    Tenant.find({}, (err, results) =>{
        if(results){
            res.status(200).send({
                message: "Success",
                data: results
            });
        } else {
            res.status(404).json({
                message: "Nothing Found"
            });
        }
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    Tenant.findById(id, (err, result) =>{
        if(err) {
            res.status(400).json({
                message: "Some error",
                error: err
            });
        } else {
            res.status(200).json({
                message: "Found",
                data: result
            })
        }
    });
});

router.put('/:id', (req, res) => {
    Tenant.findByIdAndUpdate(req.params.id, {$set: req.body}, {upsert: true}, (err, result) => {
        if(err) {
            res.status(400).send({
                message: 'Error updating',
            });
        } else {
            res.status(200).send({
                message: 'Record Updated',
                data: result
            });
        }
    }); 
});

router.delete('/:id', (req, res) => {
    Tenant.findByIdAndDelete(req.params.id, (err) => {
        if(err) {
            res.status(400).send({
                message: "Error Deleting"
            })
        } else {
            res.status(200).send({
                message: "Record Deleted"
            })
        }
    });
})


router.post('/new' ,(req, res) =>{
    let tenant = new Tenant({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        mobile_1: req.body.mobile_1,
        mobile_2: req.body.mobile_2,
        mobile_3: req.body.mobile_3,
        address_1: req.body.address_1,
        city: req.body.city,
        country: req.body.country,
        location: req.body.location
    });

    tenant.save((err) => {
        if (err) {
            res.status(400).json({
                message: "Some error",
                error: err
            });
        } else {
            res.status(200).json({
                message: "Record created",
                data: tenant
            });
        }
    });
});

module.exports = router;