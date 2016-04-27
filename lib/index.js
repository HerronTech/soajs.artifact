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

function buildResponse(soajs, opts, cb){
	if (opts.error) {
		soajs.log.error(opts.error);
		return cb({"code": opts.code, "msg": opts.config.errors[opts.code]});
	}
	return cb(null, opts.data);
}

var contactModule = {

	model: null,

	"getEntry": function (config, soajs, cb) {
		contactModule.model.getEntry(soajs, function (error, data) {
			var opts = {
				error: error,
				code: 401,
				config: config,
				data: data
			};
			return buildResponse(soajs, opts, cb);
		});
	},

	"getEntries": function (config, soajs, cb) {
		contactModule.model.getEntries(soajs, function (error, data) {
			var opts = {
				error: error,
				code: 402,
				config: config,
				data: data
			};
			return buildResponse(soajs, opts, cb);
		});
	},

	"deleteEntry": function (config, soajs, cb) {
		contactModule.model.deleteEntry(soajs, function (error, data) {
			var opts = {
				error: error,
				code: 403,
				config: config,
				data: data
			};
			return buildResponse(soajs, opts, cb);
		});
	},

	"addEntry": function (config, soajs, cb) {
		contactModule.model.addEntry(soajs, function (error, data) {
			var opts = {
				error: error,
				code: 404,
				config: config,
				data: data
			};
			return buildResponse(soajs, opts, cb);
		});
	},

	"updateEntry": function (config, soajs, cb) {
		contactModule.model.updateEntry(soajs, function (error, data) {
			var opts = {
				error: error,
				code: 405,
				config: config,
				data: data
			};
			return buildResponse(soajs, opts, cb);
		});
	},

	"matchEntry": function (config, soajs, cb) {
		contactModule.model.matchEntry(soajs, function (error, data) {
			var opts = {
				error: error,
				code: 406,
				config: config,
				data: data
			};
			return buildResponse(soajs, opts, cb);
		});
	}
};