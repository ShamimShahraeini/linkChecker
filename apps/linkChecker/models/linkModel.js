const fs = require('fs')

class linkModel {

    constructor() {
        this.file = ""
    }

    readFileContent(file) {
        return new Promise((resolve, reject) => {
            fs.open(file, 'r', (err) => {
                if (err) {
                    resolve('file does not exist')
                } else {
                    var readStream = fs.createReadStream(file)
                    resolve(readStream)
                }
            })
        })
    }

    appendToFile(file, pattern) {
        return new Promise(async (resolve, reject) => {
            const done = await this._ifExists(file, pattern)
            if (done === 'data was added to list!') {
                resolve(done)
            } else if (done === 'data should add') {
                fs.appendFile(file, pattern + '\r\n', (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve('data was added to list!')
                    }
                })
            } else {
                reject('data was NOT added to list!')
            }
        })
    }

    _ifExists(file, pattern) {
        return new Promise((resolve, reject) => {
            fs.open(file, 'r', (err) => {
                if (err) {
                    resolve('file does not exist')
                } else {
                    fs.readFile(file, {
                        encoding: 'utf-8'
                    }, (err, data) => {
                        if (err) {
                            reject(err)
                        } else {
                            if (data.indexOf(pattern) != -1) {
                                resolve('data was added to list!')
                            } else {
                                resolve('data should add')
                            }
                                
                        }
                    })
                }
            })
        })
    }
}

module.exports = new linkModel()