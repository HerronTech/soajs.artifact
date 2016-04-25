'use strict';
var soajs = require('soajs');
var config = require('./config.js');
var contactModule = require("./lib/index");

var service = new soajs.server.service(config);

service.init(function () {

	/**
	 * Get one contact
	 */
    service.get("/contact/:id", function (req, res) {
	    contactModule.getEntry(config, req, function(error, response){
		    return res.json(req.soajs.buildResponse(error, response));
	    });
    });

	/**
	 * Search for contact
	 */
	service.get("/contact/match/:q", function (req, res) {
        contactModule.matchEntry(config, req, function(error, response){
	        return res.json(req.soajs.buildResponse(error, response));
        });
    });

	/**
	 * Get all Contacts
	 */
    service.get("/contact/all", function (req, res) {
	    contactModule.getEntries(config, req, function(error, response){
		    return res.json(req.soajs.buildResponse(error, response));
	    });
    });

	/**
	 * Add one or more contacts
	 */
	service.post("/contact", function (req, res) {
		contactModule.addEntry(config, req, function(error, response){
			return res.json(req.soajs.buildResponse(error, response));
		});
	});

	/**
	 * Update one contact
	 */
    service.put("/contact/update/:id", function (req, res) {
	    contactModule.updateEntry(config, req, function(error, response){
		    return res.json(req.soajs.buildResponse(error, response));
	    });
    });

	/**
	 * Delete one contact
	 */
	service.delete("/contact/delete/:id", function (req, res) {
		contactModule.deleteEntry(config, req, function(error, response){
			return res.json(req.soajs.buildResponse(error, response));
		});
	});

    service.start();
});