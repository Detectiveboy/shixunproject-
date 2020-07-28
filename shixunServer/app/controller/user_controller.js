const users = require('../model/user_schema')
const managelogin = (ctx, next) => {
    let req = ctx.request.body
    if (req.account === 'test' && req.password === '123456') {
        ctx.body = {
            code: 200,
            msg: '欢迎管理员上线'
        }
    } else {
        ctx.body = {
            code: 400,
            msg: '账号或密码错误'
        }
    }
}
const register = async (ctx, next) => {
    let req = ctx.request.body
    if (!req.account) {
        ctx.body = {
            code: 400,
            msg: '用户名为空'
        }
        return
    }
    if (!req.password) {
        ctx.body = {
            code: 400,
            msg: '密码为空'
        }
        return
    }
    if (!req.phone) {
        ctx.body = {
            code: 400,
            msg: '请输入手机号'
        }
        return
    }
    let useraccount = await users.findOne({ account: req.account })
    let userphone = await users.findOne({ phone: req.phone })
    if (useraccount) {
        ctx.body = {
            code: 400,
            msg: '账号名已存在'
        }
        return
    }
    if (userphone) {
        ctx.body = {
            code: 400,
            msg: '手机号已被注册'
        }
        return
    }
    let user = new users(req)
    await user.save().then(() => {
        ctx.body = {
            code: 200,
            msg: '注册成功'
        }
    }).catch(err => {
        ctx.body = {
            code: 400,
            msg: '注册失败'
        }
        console.log(err)
    })
}
const login = async (ctx, next) => {
    let req = ctx.request.body
    let useraccount = await users.findOne({ account: req.account })
    let userphone = await users.findOne({ phone: req.account })
    let user = useraccount || userphone
    if (user) {
        if (user.password === req.password) {
            ctx.body = {
                code: 200,
                msg: '登陆成功',
                currentuser: user
            }
        } else {
            ctx.body = {
                code: 400,
                msg: '用户名或密码错误'
            }
        }
    } else {
        ctx.body = {
            code: 400,
            msg: '用户或密码错误'
        }
    }
}
module.exports = {
    managelogin,
    register,
    login
}