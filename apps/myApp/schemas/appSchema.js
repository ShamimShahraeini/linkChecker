module.exports = {
    
    type: 'object',
    additionalProperties: false,
    properties: {
        id: {
            type: 'string'
        },
        data: {
            type: 'object'
        },
        sth: {
            type: 'string'
        }
    },
    required: [
        'id',
        'data',
        'sth'
    ]
}