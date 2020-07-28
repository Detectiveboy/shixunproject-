const Router = require('koa-router')
const router = new Router()
const user_controller = require('../controller/user_controller')
router.post('/managelogin', user_controller.managelogin)
router.post('/register', user_controller.register)
router.post('/login', user_controller.login)
module.exports = router