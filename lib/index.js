'use strict';
var fs = require('fs');

module.exports = {
	"init": function (modelName, cb) {
		var modelPath;

		if (modelName) {
			modelPath = __dirname + "/../model/" + modelName + ".js";
			return requireModel(modelPath, cb);
		}

		modelPath = __dirname + "/../model/memory.js";
		return requireModel(modelPath, cb);

		/**
		 * checks if model file exists, requires it and returns it.
		 * @param filePath
		 * @param cb
		 */
		function requireModel(filePath, cb) {
			//check if file exist. if not return error
			fs.exists(filePath, function (exists) {
				if (!exists) {
					return cb(new Error("Requested Model Not Found!"));
				}

				contactModule.model = require(filePath);
				return cb(null, contactModule);
			});
		}
	}
};

var contactModule = {

	model: null,

	"getEntry": function (config, soajs, cb) {
		contactModule.model.getEntry(soajs, function (error, data) {
			if (error) {
				soajs.log.error(error);
				return cb({"code": 401, "msg": config.errors[401]});
			}
			return cb(null, data);
		});
	},

	"getEntries": function (config, soajs, cb) {
		contactModule.model.getEntries(soajs, function (error, data) {
			if (error) {
				soajs.log.error(error);
				return cb({"code": 402, "msg": config.errors[402]});
			}
			return cb(null, data);
		});
	},

	"deleteEntry": function (config, soajs, cb) {
		contactModule.model.deleteEntry(soajs, function (error, data) {
			if (error) {
				soajs.log.error(error);
				return cb({"code": 403, "msg": config.errors[403]});
			}
			return cb(null, data);
		});
	},

	"addEntry": function (config, soajs, cb) {
		contactModule.model.addEntry(soajs, function (error, data) {
			if (error) {
				soajs.log.error(error);
				return cb({"code": 404, "msg": config.errors[404]});
			}
			return cb(null, data);
		});
	},

	"updateEntry": function (config, soajs, cb) {
		contactModule.model.updateEntry(soajs, function (error, data) {
			if (error) {
				soajs.log.error(error);
				return cb({"code": 405, "msg": config.errors[405]});
			}
			return cb(null, data);
		});
	},

	"matchEntry": function (config, soajs, cb) {
		contactModule.model.matchEntry(soajs, function (error, data) {
			if (error) {
				soajs.log.error(error);
				return cb({"code": 406, "msg": config.errors[406]});
			}
			return cb(null, data);
		});
	}
};