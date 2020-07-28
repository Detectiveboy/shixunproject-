const mongoose = require('mongoose')
const Schema = mongoose.Schema
let user = Schema({
    id: Number,
    account: String,
    password: String,
    phone: String
})
module.exports = mongoose.model('user', user)