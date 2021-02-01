var fs = require('fs')
var path = require('path')
// const handler = require('serve-handler');
// var serveStatic = require('serve-static');
// var finalhandler = require('finalhandler')
// var contentDisposition = require('content-disposition')
var nodestatic = require('node-static');
const {
    error,
    errorNotFound,
    errorServerInternal,
    ok,
    created,
    sendFile
} = require('../../../responses/response')

class LinkController {

    constructor() {
        this.file = ''
    }

    // GET /
    getStatics = async (request, response) => {

        try {

            var filePath = request.url
            if (filePath == '/') {
                filePath = "./public"
            } else {
                filePath = "./"
            }
            var file = new nodestatic.Server(filePath);
            // console.log(request.url);
            file.serve(request, response).addListener('error', function (err) {
                console.error("Error serving " + request.url + " - " + err.message);
            })
            
            // var filePath = "." + request.url
            // if (filePath == './') {
            //     filePath = '/home/shamimshahraeeni/Documents/Mourche/frontend/LinkCheckerVueJs_Part'
            // } else {
            //     filePath = '/home/shamimshahraeeni/Documents/Mourche/frontend/LinkCheckerVueJs_Part'
            // }
            // var staticBasePath = path.join(__dirname, '../../../../frontend/LinkCheckerVueJs_Part/dist/index.html')
            // var serve = serveStatic(filePath, {
            //     'index': false,
            //     // 'setHeaders':  (res, path) => {
            //     //     response.setHeader('Content-Disposition', contentDisposition(path))
            //     //   }
            // });

            // serve(request, response, finalhandler(request, response))
            // console.log("2");
            // console.log(request.url);
            // var filePath = request.url
            // if (filePath == '/test') {
            //     filePath = '/home/shamimshahraeeni/Documents/Mourche/frontend/LinkCheckerVueJs_Part/dist'
            // } else {
            //     console.log("errrrror");
            // }
            // console.log("3");
            // await handler(request, response, {
            //     public: "../../../../frontend/LinkCheckerVueJs_Part/dist/index.html",
            //     cleanUrls: [
            //         "../../../../frontend/LinkCheckerVueJs_Part/dist/**"
            //       ],
            //       rewrites: [
            //         { "source": "/test/**", "destination": "../../../../frontend/LinkCheckerVueJs_Part/dist/index.html" },
            //       ],
            //       "directoryListing": [
            //         "../../../../frontend/LinkCheckerVueJs_Part/**"
            //       ]

            // });
            // console.log("4");
            // sendFile(response, request, "./public")
        } catch (err) {
            errorServerInternal(response, err)
        }
    }
}

module.exports = new LinkController()