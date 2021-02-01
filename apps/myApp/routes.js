const cntrl = require('./controllers/serviceController')

const requestLog = require('semicolon-requestlogger')
const contentRequestLog = requestLog('./consol.log')

module.exports = [

    {
        url: '/',
        method: 'GET',
        handler: cntrl.getStatics,
        middlewares: [contentRequestLog]
    },
    {
        url: '/public',
        method: 'GET',
        handler: cntrl.getStatics,
        middlewares: [contentRequestLog]
    },
    {
        url: '/public',
        method: 'POST',
        handler: cntrl.getStatics,
        middlewares: [contentRequestLog]
    },
    {
        url: '/',
        method: 'POST',
        handler: cntrl.getStatics,
        middlewares: [contentRequestLog]
    },
]