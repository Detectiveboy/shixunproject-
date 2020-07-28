const Router = require('koa-router')
const router = new Router()
const goods_controller = require('../controller/goods_controller')
router.post('/addgoods', goods_controller.addgoods)
router.get('/lookgoods', goods_controller.lookgoods)
router.delete('/deletegood', goods_controller.deletegood)
router.put('/modifygood', goods_controller.modifygood)
router.get('/gettotal', goods_controller.gettotal)
module.exports = router
