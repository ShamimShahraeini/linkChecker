const fs = require('fs');
const path = require('path');

exports.ok = (response, data) => {
    response.statusCode = 200
    response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    })
    response.write(JSON.stringify(data))
    response.end('')
}

exports.created = (response, data) => {
    response.statusCode = 201
    response.writeHead(201, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    })
    response.write(JSON.stringify(data))
    response.end('')
}

exports.error = (response, data) => {
    response.statusCode = 400
    response.writeHead(400, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    })
    response.write(JSON.stringify(data))
    response.end('')
}

exports.tokenExpired = (response, data) => {
    response.statusCode = 401
    response.writeHead(401, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    })
    response.write(JSON.stringify(data))
    response.end('')
}

exports.errorNotFound = (response, data) => {
    response.statusCode = 404
    response.writeHead(404, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    })
    response.write(JSON.stringify(data))
    response.end('')
}

exports.errorServerInternal = (response, data) => {
    response.statusCode = 500
    response.writeHead(500, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    })
    response.write(JSON.stringify(data))
    response.end('')
}

exports.sendFile = (res, req, staticUrl) => {
    const filePath = staticUrl + req.url
    const stream = fs.createReadStream(filePath);
    stream.on('error', function () {
        res.writeHead(404);
        res.end();
    });
    const file = req.url.split('.');
    let ext;
    if (file.length) ext = file[file.length - 1];
    let contentType;
    switch (ext) {
        case 'svg':
            contentType = contentTypes.SVG;
            break;
        case 'png':
            contentType = contentTypes.PNG;
            break;
        case 'ico':
            contentType = contentTypes.ICO;
            break;
        case 'jpg':
            contentType = contentTypes.JPEG_or_JPG;
            break;
        case 'jpeg':
            contentType = contentTypes.JPEG_or_JPG;
            break;
        case 'html':
            contentType = contentTypes.HTML;
            break;
        case 'htm':
            contentType = contentTypes.HTML;
            break;
        case 'css':
            contentType = contentTypes.CSS;
            break;
        case 'js':
            contentType = contentTypes.JS;
            break;
        case 'json':
            contentType = contentTypes.JSON;
            break;
        case 'txt':
            contentType = contentTypes.TEXT;
            break;
        case 'ttf':
            contentType = contentTypes.TTF_FONT;
            break;
    }
    if (contentType) {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Content-Type', contentType + "; charset=utf-8");
        res.statusCode = 200
        console.log(res.getHeaders());
    }
    stream.pipe(res).on('error', function (e) {
        console.log(e);
    });
};

const contentTypes = {
    JSON: 'application/json',
    SVG: 'image/svg+xml; charset=UTF-8',
    HTML: 'text/html',
    GIF: 'image/gif',
    MP3: 'audio/mpeg',
    MPEG: 'video/mpeg',
    PNG: 'image/png',
    ICO: "image/x-icon",
    JPEG_or_JPG: 'image/jpeg',
    TEXT: 'text/plain',
    TTF_FONT: 'font/ttf',
    CSS: 'text/css',
    JS: 'text/javascript',
};