const mongoose = require('mongoose')
const Schema = mongoose.Schema
let collect = Schema({
    id: Number,
    account: String,
    phone: String,
    goodlist: Array
})
module.exports = mongoose.model('collect', collect)