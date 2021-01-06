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
                        this._isAccessible('./downloadList.txt', link).then(result => {
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

    _isAccessible(file, link) {
        return new Promise((resolve, reject) => {
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
        })
    }
}

module.exports = new LinkController()