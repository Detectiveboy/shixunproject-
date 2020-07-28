const orders = require('../model/order_schema')
const random = require('random-string')
const users = require('../model/user_schema')
const goods = require('../model/goods_schema')
const addorder = async (ctx, next) => {
    let req = ctx.request.body
    let user = await users.findOne({ phone: req.phone })
    let good = await goods.findOne({ id: req.id })
    let order = new orders({
        ordernum: random({ length: 16 }),
        account: user.account,
        phone: req.phone,
        good: {
            name: good.name,
            color: good.selecteColor,
            count: req.number,
            total: req.number * good.price,
            pic: good.pic,
            price: good.price
        }
    })
    await order.save().then(async () => {
        await goods.updateOne({ id: req.id }, { $set: { num: good.num - req.number } }).catch(err => {
            console.log(err)
        })
        ctx.body = {
            code: 200,
            msg: '下单成功'
        }
    }).catch(err => {
        ctx.body = {
            code: 400,
            msg: '下单失败'
        }
        console.log(err)
    })
}
const getorderlist = async (ctx, next) => {
    let req = ctx.request.query
    let orderlist = await orders.find({ phone: req['0'] })
    if (orderlist.length === 0) {
        ctx.body = {
            code: 400,
            msg: '暂无订单'
        }
    } else {
        ctx.body = {
            code: 200,
            orderlist: orderlist,
            msg: '获取订单'
        }
    }
}
const getordercount = async (ctx, next) => {
    let req = ctx.request.query
    let orderlist = await orders.find({ phone: req['0'] })
    ctx.body = orderlist.length
}
module.exports = {
    addorder,
    getorderlist,
    getordercount
}