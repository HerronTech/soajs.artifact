'use strict';
var soajs = require('soajs');
var config = require('./config.js');
var BLModule = require("./lib/index");

var service = new soajs.server.service(config);

function initBLModel(req, res, cb) {
	var modelName = "mongo";
	if(process.env.SOAJS_TEST && req.soajs.inputmaskData.model){
		modelName = req.soajs.inputmaskData.model;
	}
	BLModule.init(modelName, function (error, BL) {
		if (error) {
			req.soajs.log.error(error);
			return res.json(req.soajs.buildResponse({"code": 407, "msg": config.errors[407]}));
		}
		else {
			return cb(BL);
		}
	});
}

service.init(function () {

	/**
	 * Get one contact
	 */
	service.get("/contact/:id", function (req, res) {
		initBLModel(req, res, function (BL) {
			BL.getEntry(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Search for contact
	 */
	service.get("/contact/match/:q", function (req, res) {
		initBLModel(req, res, function (BL) {
			BL.matchEntry(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Get all Contacts
	 */
	service.get("/contacts", function (req, res) {
		initBLModel(req, res, function (BL) {
			BL.getEntries(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Add one or more contacts
	 */
	service.post("/contact", function (req, res) {
		initBLModel(req, res, function (BL) {
			BL.addEntry(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Update one contact
	 */
	service.put("/contact/:id", function (req, res) {
		initBLModel(req, res, function (BL) {
			BL.updateEntry(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	/**
	 * Delete one contact
	 */
	service.delete("/contact/:id", function (req, res) {
		initBLModel(req, res, function (BL) {
			BL.deleteEntry(config, req.soajs, function (error, response) {
				return res.json(req.soajs.buildResponse(error, response));
			});
		});
	});

	service.start();
});