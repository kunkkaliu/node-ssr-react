const fs = require('fs');
const path = require('path');

const requireContext = (base = '.', scanSubDirectories = false, regularExpression = /\.js$/) => {
    const basePath = path.resolve(__dirname, base);
    const files = {};
    function readDirectory(directory) {
        fs.readdirSync(directory).forEach((file) => {
            const fullPath = path.resolve(directory, file);
            if (fs.statSync(fullPath).isDirectory()) {
                if (scanSubDirectories){
                    readDirectory(fullPath);
                }
                return;
            }
            if (!regularExpression.test(fullPath)){
                return;
            }
            const filePath = fullPath.substr(basePath.length);
            files[`.${filePath}`] = true;
        });
    }
    readDirectory(path.resolve(__dirname, base));
    function Module(file) {
        return require(path.join(basePath, file));
    }
    Module.keys = () => Object.keys(files);
    return Module;
};

module.exports = requireContext;