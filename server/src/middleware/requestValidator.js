const Validator = require('jsonschema').Validator;
const jsonSchema = require('../jsonSchema')
const { error } = require('../http/restResponse')

module.exports = (schema) => {
    return (req, res, next) => {
        let reqBody = getRequestBody(req);
        let jsonSchema = getJsonSchema(schema, req);
        let v = new Validator()
        let err = []
        let result = null
        // schema validation for get functionality
        result = v.validate(reqBody, jsonSchema)
        if (result) {
            if (result.valid) {
                next()
            } else {
                err = result.errors.map(function (err) {
                    return err.stack.replace(/instance./, '')
                })
                res.status(400).json(error(400, 'fail', err));
            }
        }
    }
}

let getRequestBody = (req) => {
    switch (req.method) {
        case 'POST':
            return req.body
            break;
        case 'PUT':
            return req.body
            break;
        default:
            return req.query
    }
}

let getJsonSchema = (schema, req) => {
    return jsonSchema[req.method.toLowerCase() + '.' + schema]
}