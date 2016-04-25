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
	"email": {
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
					"requied": true
				},
				"address2": {
					"type": "string",
					"requied": false
				},
				"city": {
					"type": "string",
					"requied": true
				},
				"sate": {
					"type": "string",
					"requied": true,
					"pattern": "/[A-Z]{2}/"
				},
				"zip": {
					"type": "string",
					"requied": true
				},
				"primary": {
					"type": "boolean",
					"requied": true
				}
			}
		}
	}
};