const mdl = require('../models/downloadModel')
const {
    util
} = require('./utils')
const Aria2 = require("aria2")
const aria2 = new Aria2([])

const {
    error,
    errorNotFound,
    errorServerInternal,
    ok,
    created
} = require('../../../responses/response')

class downloadController {

    constructor() {
        this.file = util.file
        this.folder = util.folder
    }

    // GET 
    getDownloadedFilesList = async (request, response) => {
        try {
            mdl.readFolderContent(this.folder).then(files => {
                ok(response, {
                    status: 'success',
                    message: 'here is ur requested data:',
                    files
                })
            }).catch(err => {
                // console.log(err);
                errorNotFound(response, {
                    status: 'fail',
                    message: 'folder does not exist'
                })
            })
        } catch (err) {
            errorServerInternal(response, err)
        }
    }

    // POST 
    ManageDownloadQueue = async (request, response) => {
        try {
            const body = request.data
            body.then(async (result) => {
                    const isValid = request.isValid
                    const validationError = request.validationError
                    const resBody = JSON.parse(result)

                    if (isValid) {
                        const options = resBody
                        const batch = await this._createBatch(options, this.file)
                        aria2
                            .open()
                            .then(async () => {
                                const promises = await aria2.batch(batch)
                                this._downloadList(promises).then(resCount => {
                                    if (resCount === batch.length) {
                                        mdl.deleteFileContent(this.file).then(res => {
                                            ok(response, {
                                                status: 'success',
                                                msg: 'All requested links downloaded. list was cleared. C U 2morrow :)'
                                            })
                                        }).catch(err => {
                                            ok(response, {
                                                status: 'success',
                                                msg: 'All requested links downloaded. but list is still full'
                                            })
                                        })

                                    } else if (resCount === 0) {
                                        error(response, {
                                            status: 'fail',
                                            msg: 'something went wrong!All failed.'
                                        })
                                    } else {
                                        error(response, {
                                            status: 'fail',
                                            msg: 'something went wrong!'
                                        })
                                    }
                                }).catch(err => {
                                    error(response, {
                                        status: 'fail',
                                        msg: 'something went wrong!' + err
                                    })
                                })

                            })
                            .catch(err => {
                                error(response, {
                                    status: 'fail',
                                    msg: 'Aria2 server failed to start!'
                                })
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


    _createBatch(options, file) {
        return new Promise((resolve, reject) => {
            mdl.readFileContent(file).then(lines => {
                const urls = []
                for (const line of lines) {
                    if (line != '') {
                        const url = []
                        url.push("addUri")
                        url.push([line])
                        url.push(options)
                        urls.push(url)
                    }
                }
                // console.log(urls);
                resolve(urls)
            }).catch(err => {
                // console.log(err);
                reject(err)
            })
        })
    }

    _downloadList(promises) {
        return new Promise((resolve, reject) => {
            var resCount = 0
            Promise.allSettled(promises).then(results => {
                let rejectedRes = []
                let fullfilledRes = []
                results.forEach(result => {
                    if (result.status === "fulfilled") {
                        // console.log('fulfilled')
                        fullfilledRes.push(result.value)
                        resCount++
                    } else if (result.status === "rejected") {
                        rejectedRes.push(result.reason.error)
                        // console.log('rejected')
                    } else {
                        // console.log('pending')
                    }
                })
                if (rejectedRes.length == 0) {
                    resolve(resCount)

                } else {
                    let failRes = []
                    rejectedRes.forEach(result => {
                        failRes.push(result.message)
                    })
                    reject(failRes)
                }

            }).catch(err => {
                reject(err)
            })
        })
    }
}

module.exports = new downloadController()