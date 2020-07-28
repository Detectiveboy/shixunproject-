const koa = require('koa')
const app = new koa()
const config = require('./config')
const mongoose = require('mongoose')
const koabody = require('koa-body')
const koastatic = require('koa-static')
const path = require('path')
let root = path.resolve('.')
app.use(koastatic(path.join(root, '/upload')))
app.use(koabody({
    strict: false
}))
mongoose.connect(config.devmongodb, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
mongoose.connection.on('connected', () => {
    console.log('database is connected')
})
mongoose.connection.on('disconnected', () => {
    console.log('database is disconnected')
})
mongoose.connection.on('err', (err) => {
    console.log(err)
})
const upload_router = require('./app/router/upload_router')
app.use(upload_router.routes()).use(upload_router.allowedMethods())
const goods_router = require('./app/router/goods_router')
app.use(goods_router.routes()).use(goods_router.allowedMethods())
const user_router = require('./app/router/user_router')
app.use(user_router.routes()).use(user_router.allowedMethods())
const collect_router = require('./app/router/collect_router')
app.use(collect_router.routes()).use(collect_router.allowedMethods())
const order_router = require('./app/router/order_router')
app.use(order_router.routes()).use(order_router.allowedMethods())
app.listen(config.port, config.host, err => {
    console.log(`server is running at ${config.host}:${config.port}`)
})