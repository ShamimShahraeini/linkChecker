const axios = require('axios')

const mdl = require('../models/linkModel')

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
        this.file = './downloadList.txt'
    }

    // GET linkService
    getLinks = async (request, response) => {
        try {
            const data = await mdl.readFileContent(this.file)
            
            if (data) {
                data.pipe(response)
            } else {
                const responseBody = {
                    status: 'fail',
                    message: 'file does not exist!'
                }
                errorNotFound(response, responseBody)
            }
        } catch (err) {
            errorServerInternal(response, err)
        }
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
                        this._isAccessible(this.file, link).then(result => {
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


    _startsWith(str, word) {
        return str.lastIndexOf(word, 0) === 0;
    }

    _isAccessible(file, link) {
        return new Promise(async (resolve, reject) => {
            if (link.lastIndexOf("magnet", 0) === 0 || link.lastIndexOf("magnet", 0) === 0) {
                const done = await mdl.appendToFile(file, link)
                if (done === 'data was added to list!') {
                    resolve(done)
                } else {
                    reject('data was NOT added to list!')
                }
            } else {
                axios({
                    method: 'HEAD',
                    url: link,
                }).then(async (res) => {
                    if (res.headers['content-type'].includes('text/html;')) {
                        reject(`link doesn't contain file!`)
                    } else {
                        const done = await mdl.appendToFile(file, link)
                        if (done === 'data was added to list!') {
                            resolve(done)
                        } else {
                            reject('data was NOT added to list!')
                        }
                    }
                }).catch(err => {
                    reject('link is not reachable!')
                })
            }

        })
    }

}

module.exports = new LinkController()