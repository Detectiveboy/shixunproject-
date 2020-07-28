const goods = require('../model/goods_schema')
const fs = require('fs')
const path = require('path')
const addgoods = async (ctx, next) => {
    const req = ctx.request.body
    if (!req.name) {
        ctx.body = {
            code: 400,
            msg: '缺少名字'
        }
        return
    }
    if (!req.selecteColor) {
        ctx.body = {
            code: 400,
            msg: '缺少颜色'
        }
        return
    }
    if (!req.desc) {
        ctx.body = {
            code: 400,
            msg: '缺少描述'
        }
        return
    }
    if (!req.pic) {
        ctx.body = {
            code: 400,
            msg: '照片未上传'
        }
        return
    }
    let colorgood = await goods.findOne({ selecteColor: req.selecteColor })
    let cargood = await goods.findOne({ name: req.name })
    if (colorgood && cargood) {
        if (colorgood.name === cargood.name) {
            ctx.body = {
                code: 400,
                msg: '你正在添加相同的电车'
            }
            return
        }
    }
    let good = new goods(req)
    await good.save().then(() => {
        ctx.body = {
            code: 200,
            msg: '成功添加到库存中'
        }
    }).catch(err => {
        console.log(err)
        ctx.body = {
            code: 500,
            msg: '库存添加失败'
        }
    })
}
const lookgoods = async (ctx, next) => {
    let req = ctx.request.query
    let allgoods = await goods.find().skip(+req.pagesize * (req.currentpage - 1)).limit(+req.pagesize).sort({ _id: -1 })
    if (allgoods.length === 0) {
        ctx.body = {
            code: 300,
            msg: '库存为空'
        }
    } else {
        ctx.body = {
            code: 200,
            goodlist: allgoods,
        }
    }
}
const deletegood = async (ctx, next) => {
    let req = ctx.request.body
    let good = await goods.findOne({ id: req })
    let root = path.resolve('.')
    let filepath = path.join(root, '/upload/', good.pic)
    fs.exists(filepath, async flag => {
        if (flag) {
            await fs.unlink(filepath, err => {
                console.log(err)
            })
        } else {
            ctx.body = {
                code: 500,
                msg: '图片不存在'
            }
            return
        }
    })
    await goods.deleteOne({ id: req }).then(async () => {
        let goodslist = await goods.find()
        ctx.body = {
            code: 200,
            goodlist: goodslist,
            msg: '删除成功'
        }
    }).catch(err => {
        console.log(err)
        ctx.body = {
            code: 500,
            msg: '服务器错误'
        }
    })
}
const modifygood = async (ctx, next) => {
    let req = ctx.request.body
    let good = await goods.findOne({ id: req.id })
    if (req.name === good.name && req.price === good.price && req.num === good.num && req.selecteColor === good.selecteColor && req.desc === good.desc) {
        ctx.body = {
            code: 400,
            msg: '你确定你修改了!'
        }
        return
    }
    await goods.updateOne({ id: req.id }, req).then(async () => {
        let goodlist = await goods.find()
        ctx.body = {
            code: 200,
            msg: '数据修改成功',
            goodlist: goodlist
        }
    }).catch(err => {
        console.log(err)
        ctx.body = {
            code: 400,
            msg: '数据修改失败'
        }
    })
}
const gettotal = async (ctx, next) => {
    ctx.body = await goods.countDocuments()
}
module.exports = {
    addgoods,
    lookgoods,
    deletegood,
    modifygood,
    gettotal
}