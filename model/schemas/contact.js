"use strict";

module.exports = {
	"firstName": {
		"required": true,
		"type": "string"
	},
	"lastName": {
		"required": true,
		"type": "string"
	},
	"emails": {
		"required": true,
		"type": "array",
		"items": {
			"type": "object",
			"properties": {
				"address": {"type": "string", "format": "email", "required": true},
				"primary": {"type": "boolean", "required": true}
			}
		},
		"minItems": 1,
		"maxItems": 5,
		"uniqueItems": true
	},
	"addresses": {
		"type": "array",
		"minItems": 1,
		"uniqueItems": true,
		"items": {
			"type": "object",
			"properties": {
				"address1": {
					"type": "string",
					"required": true
				},
				"address2": {
					"type": "string",
					"required": false
				},
				"city": {
					"type": "string",
					"required": true
				},
				"state": {
					"type": "string",
					"required": true,
					"pattern": "[A-Z]{2}"
				},
				"zip": {
					"type": "string",
					"required": true
				},
				"primary": {
					"type": "boolean",
					"required": true
				}
			}
		}
	}
};