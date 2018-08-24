function ignore() {
    var extensions = ['.css', '.less']; //里面定义不需要加载的文件类型
    for (let i = 0, len = extensions.length; i < len; i++) {
        require.extensions[extensions[i]] = function () {
            return false;
        };
    }
}

module.exports = ignore;
