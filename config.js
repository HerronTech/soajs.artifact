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
        "/contact/:id": {
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
        },
        "/contact/match/:q": {
            "_apiInfo": {
                "l": "Get contacts matching a query",
                "group": "Advance",
                "groupMain": true
            },
            "q": {
                "source": ['params.q'],
                "required": true,
                "validation": {
                    "type": "string"
                }
            }
        },
        "/contact": {
            "_apiInfo": {
                "l": "Get all contacts",
                "group": "Basic",
                "groupMain": true
            }
        }
    }
};