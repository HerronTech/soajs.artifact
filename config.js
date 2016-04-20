'use strict';

module.exports = {
    serviceName: "soajs.artifact",
    serviceVersion: 1,
    servicePort: 4999,
    serviceGroup: "SOAJS artifact",
    extKeyRequired: false,
    type: "service",
    prerequisites: {
        cpu: '',
        memory: ''
    },
    "errors": {},
    "schema": {
        "/:id": {
            "_apiInfo": {
                "l": "Get contact by ID",
                "group": "Basic",
                "groupMain": true
            },
            "id": {
                "source": ['params.id'],
                "required": true,
                "validation": {
                    "type": "string"
                }
            }
        }
    }
};