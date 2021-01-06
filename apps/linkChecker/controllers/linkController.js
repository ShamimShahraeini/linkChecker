const axios = require('axios')
const fs = require('fs')

const {
    error,
    errorNotFound,
    errorServerInternal,
    ok,
    created
} = require('../../../responses/response')

class LinkController {

    constructor() {
        this.link = ""
    }

    // GET linkService
    getLinks = async (request, response) => {


        fs.readFile('./downloadList.txt', {
            encoding: 'utf-8'
        }, function (err, data) {
            if (!err) {
                const responseBody = {
                    status: 'Ok',
                    message: 'Here is ur requested data:',
                    data: data
                }
                ok(response, responseBody)
            } else {
                const responseBody = {
                    status: 'Not Found',
                    message: ('No such file or directory.')
                }
                errorNotFound(response, responseBody)
            }
        })
    }

    // POST /linkService
    checkLink = async (request, response) => {

        try {
            const body = request.data
            body.then(async (result) => {
                    const isValid = request.isValid
                    const validationError = request.validationError
                    const resBody = JSON.parse(result)

                    if (isValid) {
                        const link = resBody.link
                        this.isAccessible('./downloadList.txt', link).then(result => {
                            const responseBody = {
                                status: 'success',
                                message: result
                            }
                            ok(response, responseBody)
                        }).catch(err => {
                            const responseBody = {
                                status: 'fail',
                                message: 'link was NOT added to list!  ' + err
                            }
                            error(response, responseBody)
                        })
                    } else {
                        error(response, validationError)
                    }
                })
                .catch(err => {
                    errorServerInternal(response, err)
                })

        } catch (err) {
            errorServerInternal(response, err)
        }
    }

    isAccessible(file, link) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'HEAD',
                url: link,
            }).then(async (res) => {
                if (res.headers['content-type'].includes('text/html;')) {
                    reject(`link doesn't contain file!`)
                } else {
                    const done = await this.appendToFile(file, link)
                    if (done === 'link was added to list!') {
                        resolve(done)
                    } else {
                        reject(done)
                    }
                }
            }).catch(err => {
                reject('link is not reachable!')
            })
        })
    }

    appendToFile(file, pattern) {
        return new Promise(async (resolve, reject) => {
            const done = await this.ifExists(file, pattern)
            if (done === 'link was added to list!') {
                resolve(done)
            } else {
                fs.appendFile(file, pattern + '\r\n', (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve('link was added to list!')
                    }
                })
            }

        })
    }

    ifExists(file, pattern) {
        return new Promise((resolve, reject) => {
            fs.open(file,'r',(err) => {
                if (err) {
                    resolve('file does not exist')
                } else {
                    fs.readFile(file, {
                        encoding: 'utf-8'
                    }, (err, data) => {
                        if (err) {
                            reject(err)
                        } else {
                            if (data.indexOf(pattern) != -1)
                                resolve('link was added to list!')
                        }
                    })
                }
            })
        })
    }
}

module.exports = new LinkController()