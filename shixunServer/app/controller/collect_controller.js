const collect = require('../model/collect_schema')
const users = require('../model/user_schema')
const goods = require('../model/goods_schema')
const addcollect = async (ctx, next) => {
    let req = ctx.request.body
    let usercollect = await collect.findOne({ phone: req.phone })
    let good = await goods.findOne({ id: req.id })
    let user = await users.findOne({ phone: req.phone })
    if (usercollect) {
        let been = await collect.findOne({ goodlist: { $elemMatch: { name: good.name } } })
        if (been) {
            ctx.body = {
                code: 400,
                msg: '收藏夹内已存在该商品'
            }
            return
        } else {
            let arr = usercollect.goodlist
            arr.push({
                name: good.name,
                price: good.price,
                pic: good.pic,
                selecteColor: good.selecteColor,
                id: good.id
            })
            await collect.updateOne({ phone: req.phone }, { $set: { goodlist: arr } }).then(() => {
                ctx.body = {
                    code: 200,
                    msg: '收藏夹添加成功'
                }
            }).catch(err => {
                ctx.body = {
                    code: 400,
                    msg: '收藏夹添加失败'
                }
                console.log(err)
            })
        }
    } else {
        let newcollect = new collect({
            id: new Date().getTime(),
            account: user.account,
            phone: user.phone,
            goodlist: [{
                name: good.name,
                price: good.price,
                pic: good.pic,
                selecteColor: good.selecteColor,
                id: goodid
            }]
        })
        await newcollect.save().then(() => {
            ctx.body = {
                code: 200,
                msg: '收藏夹添加成功'
            }
        }).catch(err => {
            ctx.body = {
                code: 400,
                msg: '收藏夹添加失败'
            }
        })
    }
}
const getcollect = async (ctx, next) => {
    let req = ctx.request.query
    let collects = await collect.findOne({ phone: req['0'] })
    if (collects) {
        ctx.body = {
            code: 200,
            msg: '获取收藏夹',
            goodlist: collects.goodlist
        }
    } else {
        ctx.body = {
            code: 400,
            msg: '收藏夹为空'
        }
    }
}
const deletecollect = async (ctx, next) => {
    let req = ctx.request.body
    let usercollect = await collect.findOne({ phone: req.phone })
    let arr = usercollect.goodlist
    let newarr = []
    arr.forEach(i => {
        if (i.id !== req.id) {
            newarr.push(i)
        }
    })
    await collect.updateOne({ phone: req.phone }, { $set: { goodlist: newarr } }).then(() => {
        ctx.body = {
            code: 200,
            msg: '删除成功'
        }
    }).catch(err => {
        ctx.body = {
            code: 400,
            msg: '删除失败'
        }
        console.log(err)
    })
}
const getcollectcount = async (ctx, next) => {
    let req = ctx.request.query
    let collects = await collect.findOne({ phone: req['0'] })
    ctx.body = collects === null ? 0 : collects.goodlist.length
}
module.exports = {
    addcollect,
    getcollect,
    deletecollect,
    getcollectcount
}