const fs = require('fs');
const File = require('../../models/File')
const config = require('config')
class FileServices {

    createDir(file){
        const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`
        return new Promise(((resolve, reject) =>{
            try {
                if(!fs.existsSync(filePath)){
                    fs.mkdirSync(filePath)
                    return resolve({message: 'The folder has been created'})
                }
                else {
                    return reject({message: 'The folder exist'}) 
                }
            } catch (error) {
                return reject({message: 'Error'})
            }
        }))
    }
}


module.exports = new FileServices()