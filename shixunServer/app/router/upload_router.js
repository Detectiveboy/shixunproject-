const Router = require('koa-router')
const router = new Router()
const uploadcontroller = require('../controller/upload_controller')
const multer = require('koa-multer')
const date = require('../../utils/getdate')
const storage = multer.diskStorage({
    destination: './upload',
    filename(ctx, file, callback) {
        callback(null, date() + " " + file.originalname)
    }
})
const uploadpic = multer({ storage })
router.post('/upload', uploadpic.single('file'), uploadcontroller.upload)
module.exports = router