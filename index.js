const fs = require('fs')
const events = require('events')
const eventEmitter = new events.EventEmitter()

const Server = require('semicolon-server')
const Router = require('semicolon-router')

const { serverRequirement, appsDirectory } = require('./config')

const server = new Server(serverRequirement, eventEmitter)
const router = new Router(eventEmitter)

loadApps()
server.start()



function loadApps() {
    // getting routes of each app we wanna add 
    const appNames = fs.readdirSync(appsDirectory)
    appNames.forEach(appName => {
        const appRoutes = require(`${appsDirectory}/${appName}/routes`)
        // add app routes
        router.app(appRoutes)
    })
}