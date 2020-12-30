const fs = require("fs")

const fileController = {
    openFile: function (file) {
        let fileJSON = fs.readFileSync(file, { encoding: 'utf-8' })
        fileJSON = JSON.parse(fileJSON)
        return fileJSON
    },
    saveFile: function(item,file){
        let itemToSave = JSON.stringify(item)
        fs.writeFileSync(file, itemToSave)
    }
}
module.exports = fileController