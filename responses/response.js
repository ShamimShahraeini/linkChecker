exports.ok = (response, data) => {
    response.statusCode = 200
    response.writeHead(200, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' })
    response.write(JSON.stringify(data))
    response.end('')
}

exports.created = (response, data) => {
    response.statusCode = 201
    response.writeHead(201, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' })
    response.write(JSON.stringify(data))
    response.end('')
}

exports.error = (response, data) => {
    response.statusCode = 400
    response.writeHead(400, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' })
    response.write(JSON.stringify(data))
    response.end('')
}

exports.tokenExpired = (response, data) => {
    response.statusCode = 401
    response.writeHead(401, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' })
    response.write(JSON.stringify(data))
    response.end('')
}

exports.errorNotFound = (response, data) => {
    response.statusCode = 404
    response.writeHead(404, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' })
    response.write(JSON.stringify(data))
    response.end('')
}

exports.errorServerInternal = (response, data) => {
    response.statusCode = 500
    response.writeHead(500, { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' })
    response.write(JSON.stringify(data))
    response.end('')
}