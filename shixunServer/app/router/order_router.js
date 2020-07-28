const order_controller = require('../controller/order_controller')
const Router = require('koa-router')
const router = new Router()
router.post('/addorder', order_controller.addorder)
router.get('/getorderlist', order_controller.getorderlist)
router.get('/getordercount', order_controller.getordercount)
module.exports = router