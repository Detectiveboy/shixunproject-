const upload = (ctx, next) => {
    let req = ctx.req.file
    ctx.body = req.filename
}
module.exports = {
    upload,
}