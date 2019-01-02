var mongoose = require('mongoose');

var tenantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        max: 100
    },
    gender: {
        type: String,
        required: true
    },
    mobile_1: {
        type: Number,
        required: true
    },
    mobile_2: {
        type: Number,
        required: true
    },
    mobile_3: {
        type: Number,
        required: true
    },
    address_1: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});


var Tenant = mongoose.model('Tenant', tenantSchema, 'tenants');

module.exports = Tenant;