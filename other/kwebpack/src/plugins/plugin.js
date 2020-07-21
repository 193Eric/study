class Plugin{
    apply(compiler) {
        compiler.hooks.emit.tap('emit', function() {
            console.log('现在是emit钩子触发')
        })
    }
}

module.exports = Plugin