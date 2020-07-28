const collect_controller = require('../controller/collect_controller')
const Router = require('koa-router')
const router = new Router()
router.post('/addcollect', collect_controller.addcollect)
router.get('/getcollect', collect_controller.getcollect)
router.delete('/deletecollect', collect_controller.deletecollect)
router.get('/getcollectcount', collect_controller.getcollectcount)
module.exports = router