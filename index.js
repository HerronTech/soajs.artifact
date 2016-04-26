'use strict';
var soajs = require('soajs');
var config = require('./config.js');
var module = require("./lib/index");

var service = new soajs.server.service(config);

function initModel(req, res, cb) {
	module.init("mongo", function (error, model) {
		if (error) {
			req.soajs.log.error(error);
			return res.json(req.soajs.buildResponse({"code": 407, "msg": config.errors[407]}));
		}
		else {
			return cb(model);
		}
	});
}

service.init(function () {

	/**
	 * Get one contact
	 */
	service.get("/contact/:id", function (req, res) {
		initModel(req, res, function (model) {
			model.getEntry(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Search for contact
	 */
	service.get("/contact/match/:q", function (req, res) {
		initModel(req, res, function (model) {
			model.matchEntry(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Get all Contacts
	 */
	service.get("/contact/all", function (req, res) {
		initModel(req, res, function (model) {
			model.getEntries(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Add one or more contacts
	 */
	service.post("/contact", function (req, res) {
		initModel(req, res, function (model) {
			model.addEntry(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Update one contact
	 */
	service.put("/contact/update/:id", function (req, res) {
		initModel(req, res, function (model) {
			model.updateEntry(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Delete one contact
	 */
	service.delete("/contact/delete/:id", function (req, res) {
		initModel(req, res, function (model) {
			model.deleteEntry(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	service.start();
});