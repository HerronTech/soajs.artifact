'use strict';

module.exports = {
    serviceName: "artifact",
    serviceVersion: 1,
    servicePort: 4999,
    serviceGroup: "SOAJS artifact",
    extKeyRequired: false,
	oauth:false,
    type: "service",
    prerequisites: {
        cpu: '',
        memory: ''
    },
    "errors": {
        400: "Error Executing Operations!",
        401: "Entry not found!",
        402: "Error fetching Entries!",
        403: "Error Deleting Entry!",
        404: "Error Adding Entry!",
        405: "Error Updating Entry!",
        406: "Error Matching Criteria!",
        407: "Error Loading Model!"
    },
    "schema": {
        "commonFields": {
            "id": {
                "source": ['params.id'],
                "required": true,
                "validation": {
                    "type": "string"
                }
            },
            "model": {
                "source": ['query.model'],
                "required": false,
                "default": "memory",
                "validation": {
                    "type": "string",
                    "enum": ["memory", "mongo"]
                }
            }
        },
        "get": {
            "/contact/:id": {
                "_apiInfo": {
                    "l": "Get contact by ID",
                    "group": "Basic",
                    "groupMain": false
                },
                "commonFields": ["id", "model"]
            },

            "/contact/match/:q": {
                "_apiInfo": {
                    "l": "Get contacts matching a query",
                    "group": "Advance",
                    "groupMain": true
                },
                "commonFields": ["model"],
                "q": {
                    "source": ['params.q'],
                    "required": true,
                    "validation": {
                        "type": "string"
                    }
                }
            },

            "/contacts": {
                "_apiInfo": {
                    "l": "Get all contacts",
                    "group": "Basic",
                    "groupMain": true
                },
                "commonFields": ["model"],
                "from": {
                    "source": ['query.from', 'body.from'],
                    "required": false,
                    "default": 0,
                    "validation": {
                        "min": 0,
                        "max": 100,
                        "type": "integer"
                    }
                },
                "to": {
                    "source": ['query.to', 'body.to'],
                    "required": false,
                    "default": 100,
                    "validation": {
                        "min": 0,
                        "max": 100,
                        "type": "integer"
                    }
                }
            }
        },
        "post": {
            "/contact": {
                "_apiInfo": {
                    "l": "Add new Contact(s)",
                    "group": "Basic",
                    "groupMain": false
                },
                "commonFields": ["model"],
                "data": {
                    "source": ["body.data"],
                    "required": true,
                    "validation": {
                        "oneOf": [
                            {
                                "type": "object",
                                "properties": require(__dirname + "/model/schemas/contact.js")
                            },
                            {
                                "type": "array",
                                "minItems": 1,
                                "uniqueItems": true,
                                "items": {
                                    "type": "object",
                                    "properties": require(__dirname + "/model/schemas/contact.js")
                                }
                            }
                        ]
                    }
                }
            }
        },
        "put": {
            "/contact/:id": {
                "_apiInfo": {
                    "l": "Update contact by ID",
                    "group": "Basic",
                    "groupMain": false
                },
                "commonFields": ["id", "model"],
                "data": {
                    "required": true,
                    "source": ["body.data"],
                    "validation": {
                        "type": "object",
                        "properties": require(__dirname + "/model/schemas/contact.js")
                    }
                }
            }
        },
        "delete": {
            "/contact/:id": {
                "_apiInfo": {
                    "l": "Delete contact by ID",
                    "group": "Basic",
                    "groupMain": false
                },
                "commonFields": ["id", "model"]
            }
        }
    }
};