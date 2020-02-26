const mongoose = require('mongoose')

const couponModel = new mongoose.Schema({
    type: String
}, { timestamps: true })

module.exports = mongoose.model('coupons', couponModel)
