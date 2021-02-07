const cntrl = require('./controllers/downloadController')
const dataPreparation = require('semicolon-datapreparator')

const dataValidation = require('semicolon-datavalidator')
const schema = require('./schemas/downloadSchema')
const downloadValidation = dataValidation(schema)

const requestLog = require('semicolon-requestlogger')
const contentRequestLog = requestLog('./consol.log')

module.exports = [

    {
        url: '/downloadService',
        method: 'GET',
        handler: cntrl.getDownloadedFilesList,
        middlewares: [dataPreparation, contentRequestLog]
    },
    {
        url: '/downloadService',
        method: 'POST',
        handler: cntrl.ManageDownloadQueue,
        middlewares: [dataPreparation, downloadValidation, contentRequestLog]
    }
]