'use strict';


module.exports = function (model, log) {
	if (model) {
		contactModule.model = model;
		return contactModule;
	}
	else {
		var fileName = "../model/" + (process.env.SOAJS_MODELNAME || "memory") + ".js";
		//check if file exist. if not return error
		contactModule.model = require (fileName);
		return contactModule;
	}
	contactModule.log = log;
}

var contactModule = {

	model : null,
	log : null,

	"getEntry": function(config, req, cb){
		contactModule.model.getEntry(req, function(error, data){
			if(error){
				contactModule.log.error(error);
				return cb({"code": 401, "msg": config.errors[401]})
			}
			return cb(null, data);
		});
	},

	"getEntries": function(config, req, cb){
		contactModule.model.getEntries(req, function(error, data){
			if(error){
				contactModule.log.error(error);
				return cb({"code": 402, "msg": config.errors[402]})
			}
			return cb(null, data);
		});
	},

	"deleteEntry": function(config, req, cb){
		contactModule.model.deleteEntry(req, function(error, data){
			if(error){
				contactModule.log.error(error);
				return cb({"code": 403, "msg": config.errors[403]})
			}
			return cb(null, data);
		});
	},

	"addEntry": function(config, req, cb){
		contactModule.model.addEntry(req, function(error, data){
			if(error){
				contactModule.log.error(error);
				return cb({"code": 404, "msg": config.errors[404]})
			}
			return cb(null, data);
		});
	},

	"updateEntry": function(config, req, cb){
		contactModule.model.updateEntry(req, function(error, data){
			if(error){
				contactModule.log.error(error);
				return cb({"code": 405, "msg": config.errors[405]})
			}
			return cb(null, data);
		});
	},

	"matchEntry": function(config, req, cb){
		contactModule.model.matchEntry(req, function(error, data){
			if(error){
				contactModule.log.error(error);
				return cb({"code": 406, "msg": config.errors[406]})
			}
			return cb(null, data);
		});
	}
};