'use strict';

var model = process.env.SOAJS_MODELNAME || "memory";

module.exports = {

	"getEntry": function(config, req, cb){
		model.getEntry(req, function(error, data){
			if(error){
				req.soajs.log.error(error);
				return cb({"code": 401, "msg": config.errors[401]})
			}
			return cb(null, data);
		});
	},

	"getEntries": function(config, req, cb){
		model.getEntries(req, function(error, data){
			if(error){
				req.soajs.log.error(error);
				return cb({"code": 402, "msg": config.errors[402]})
			}
			return cb(null, data);
		});
	},

	"deleteEntry": function(config, req, cb){
		model.deleteEntry(req, function(error, data){
			if(error){
				req.soajs.log.error(error);
				return cb({"code": 403, "msg": config.errors[403]})
			}
			return cb(null, data);
		});
	},

	"addEntry": function(config, req, cb){
		model.addEntry(req, function(error, data){
			if(error){
				req.soajs.log.error(error);
				return cb({"code": 404, "msg": config.errors[404]})
			}
			return cb(null, data);
		});
	},

	"updateEntry": function(config, req, cb){
		model.updateEntry(req, function(error, data){
			if(error){
				req.soajs.log.error(error);
				return cb({"code": 405, "msg": config.errors[405]})
			}
			return cb(null, data);
		});
	},

	"matchEntry": function(config, req, cb){
		model.matchEntry(req, function(error, data){
			if(error){
				req.soajs.log.error(error);
				return cb({"code": 406, "msg": config.errors[406]})
			}
			return cb(null, data);
		});
	}
};