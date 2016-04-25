'use strict';
var _ = require("lodash");
var data = require(__dirname + "/../data/index.json");

module.exports = {

	"getEntry": function(config, req, cb){
		var id = req.soajs.inputmaskData.id;
		if(!data){
			return cb(new Error("data object doesn't exist!"));
		}

		if(!data[id]){
			return cb(null, null);
		}

		return cb(null, data[id]);
	},

	"getEntries": function(config, req, cb){
		if(!data){
			return cb(new Error("data object doesn't exist!"));
		}

		if(req.soajs.inputmaskData.from && req.soajs.inputmaskData.to){
			var from = req.soajs.inputmaskData.from;
			var to = req.soajs.inputmaskData.to;
			var keys = Object.keys(data);

			if(to > keys.length -1){
				to = keys.length;
			}
			keys.slice(from, to);

			var output = {};
			keys.forEach(function(oneKey){
				output[oneKey] = data[oneKey];
			});
			return cb(null, output);
		}

		return cb(null, data);
	},

	"deleteEntry": function(config, req, cb){
		if(!data){
			return cb(new Error("data object doesn't exist!"));
		}

		var id = req.soajs.inputmaskData.id;
		if(!data[id]){
			return cb(new Error("no entry found in data object for id ", id));
		}

		delete data[id];
		return cb(null, true);
	},

	"addEntry": function(config, req, cb){
		if(!data){
			data = {};
		}

		if(Array.isArray(req.soajs.inputmaskData.data)){
			req.soajs.inputmaskData.data.forEach(function(oneContact){
				pushRecord(oneContact);
			});
		}
		else{
			pushRecord(req.soajs.inputmaskData.data);
		}

		return cb(null, true);

		function pushRecord(oneRecord){
			var uId = _.uniqueId();
			data[uId] = oneRecord;
		}
	},

	"updateEntry": function(config, req, cb){
		if(!data){
			return cb(new Error("data object doesn't exist!"));
		}

		var id = req.soajs.inputmaskData.id;
		if(!data[id]){
			return cb(new Error("no entry found in data object for id ", id));
		}
		
		data[id] = req.soajs.inputmaskData.data;
		return cb(null, true);
	},

	"matchEntry": function(config, req, cb){
		if(!data){
			return cb(new Error("data object doesn't exist!"));
		}

		var match = {};

		for(var entryId in data){
			if(Object.hasOwnProperty.call(data, entryId)){
				if(req.soajs.inputmaskData.q.indexOf(data[entryId].firstName) !== -1){
					match[entryId] = data[entryId];
				}
				else if(data[entryId].firstName.indexOf(req.soajs.inputmaskData.q) !== -1){
					match[entryId] = data[entryId];
				}
				else if(req.soajs.inputmaskData.q.indexOf(data[entryId].lastName) !== -1){
					match[entryId] = data[entryId];
				}
				else if(data[entryId].lastName.indexOf(req.soajs.inputmaskData.q) !== -1){
					match[entryId] = data[entryId];
				}
			}
		}

		return cb(null, match);
	}
};