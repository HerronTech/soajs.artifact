'use strict';

var contact = require(__dirname + "/model/schemas/contact.js");

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
	"errors": {
		400: "Error Executing Operations!",
		401: "Entry not found!",
		402: "Error fetching Entries!",
		403: "Error Deleting Entry!",
		404: "Error Adding Entry!",
		405: "Error Updating Entry!",
		406: "Error Matching Criteria!"
	},
	"schema": {
		"commonFields": {
			"id": {
				"source": ['params.id'],
				"required": true,
				"validation": {
					"type": "string"
				}
			}
		},

		"/contact/:id": {
			"_apiInfo": {
				"l": "Get contact by ID",
				"group": "Basic",
				"groupMain": false
			},
			"commonFields": ["id"]
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

		"/contact/all": {
			"_apiInfo": {
				"l": "Get all contacts",
				"group": "Basic",
				"groupMain": true
			},
			"from": {
				"source": ['params.from', 'body.from'],
				"required": false,
				"default": 0,
				"validation": {
					"min": 0,
					"max": 100,
					"type": "integer"
				}
			},
			"to": {
				"source": ['params.to', 'body.to'],
				"required": false,
				"default": 100,
				"validation": {
					"min": 0,
					"max": 100,
					"type": "integer"
				}
			}
		},

		"/contact": {
			"_apiInfo": {
				"l": "Add new Contact(s)",
				"group": "Basic",
				"groupMain": false
			},
			"data": {
				"source": ["body.data"],
				"required": true,
				"validation": {
					"oneOf": [
						{
							"type": "object",
							"properties": contact
						},
						{
							"type": "array",
							"minItems": 1,
							"uniqueItems": true,
							"items": {
								"type": "object",
								"properties": contact
							}
						}
					]
				}
			}
		},

		"/contact/update/:id": {
			"_apiInfo": {
				"l": "Update contact by ID",
				"group": "Basic",
				"groupMain": false
			},
			"commonFields": ["id"],
			"data":{
				"required": true,
				"source": ["body.data"],
				"validation":{
					"type": "object",
					"properties": contact
				}
			}
		},

		"/contact/delete/:id": {
			"_apiInfo": {
				"l": "Delete contact by ID",
				"group": "Basic",
				"groupMain": false
			},
			"commonFields": ["id"]
		}
	}
};