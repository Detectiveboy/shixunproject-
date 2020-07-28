const mongoose = require('mongoose')
const Schema = mongoose.Schema
const order = Schema({
    ordernum: String,
    account: String,
    phone: String,
    good: Object
})
module.exports = mongoose.model('orders', order)