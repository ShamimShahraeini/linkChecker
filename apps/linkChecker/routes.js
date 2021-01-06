const cntrl = require('./controllers/linkController')

const dataPreparation = require('semicolon-datapreparator')

const linkSchema = require('./schemas/linkSchema')
const dataValidation = require('semicolon-datavalidator')

const linkValidation = dataValidation(linkSchema)

const requestLog = require('semicolon-requestlogger')
const contentRequestLog = requestLog('./consol.log')

module.exports = [

    {
        url: '/linkService',
        method: 'GET',
        handler: cntrl.getLinks,
        middlewares: [contentRequestLog]
    },
    {
        url: '/linkService',
        method: 'POST',
        handler: cntrl.checkLink,
        middlewares: [dataPreparation, linkValidation, contentRequestLog]
    }
]