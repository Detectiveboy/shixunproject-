const mongoose = require('mongoose')
const Schema = mongoose.Schema
const goods = new Schema({
    id: Number,
    name: String,
    price: Number,
    selecteColor: String,
    num: Number,
    desc: String,
    pic: String
})
module.exports = mongoose.model('goods', goods)