"use strict";
var contacts = {
	"1": {
		"_id": "1",
		"firstName": "John",
		"lastName": "Doe",
		"emails": [
			{
				"address": "me@gmail.com",
				"primary": true
			}
		],
		"addresses": [
			{
				"address1": "123 cory street",
				"address2": "suite 12",
				"city": "boston",
				"state": "MA",
				"zip": "12345",
				"primary": true
			}
		]
	}
};

module.exports = contacts;