'use strict';
var soajs = require('soajs');
var Mongo = soajs.mongo;
var mongo;

var dbName = "myContacts";
var collName = "records";

function checkIfMongo(soajs) {
	if (!mongo) {
		mongo = new Mongo(soajs.registry.coreDB[dbName]);
	}
}

function validateId(id, cb) {
	try {
		return cb(null, mongo.ObjectId(id));
	}
	catch (e) {
		return cb(e);
	}
}

module.exports = {

	"getEntry": function (soajs, cb) {
		checkIfMongo(soajs);
		validateId(soajs.inputmaskData.id, function (error, id) {
			if (error) {
				return cb(error);
			}

			mongo.findOne(collName, {"id": id}, cb);
		});
	},

	"getEntries": function (soajs, cb) {
		checkIfMongo(soajs);
		var options = {};
		if (soajs.inputmaskData.from && soajs.inputmaskData.to) {
			options = {
				start: soajs.inputmaskData.from,
				limit: soajs.inputmaskData.to
			};
		}
		mongo.find(collName, {}, options, cb);
	},

	"deleteEntry": function (soajs, cb) {
		checkIfMongo(soajs);
		validateId(soajs.inputmaskData.id, function (error, id) {
			if (error) {
				return cb(error);
			}

			mongo.count(collName, {"id": id}, function (error, count) {
				if (error) {
					return cb(error);
				}

				if (!count) {
					return cb(new Error("No entry found for id ", id));
				}

				mongo.remove(collName, {"id": id}, cb);
			});
		});
	},

	"addEntry": function (soajs, cb) {
		checkIfMongo(soajs);
		mongo.insert(collName, soajs.inputmaskData.data, cb);
	},

	"updateEntry": function (soajs, cb) {
		checkIfMongo(soajs);
		validateId(soajs.inputmaskData.id, function (error, id) {
			if (error) {
				return cb(error);
			}

			mongo.count(collName, {"id": id}, function (error, count) {
				if (error) {
					return cb(error);
				}

				if (!count) {
					return cb(new Error("No entry found for id ", id));
				}

				var updateRec = soajs.inputmaskData.data;
				mongo.update(collName, {"id": id}, updateRec, {"multi": false, "upsert": false, "safe": true}, cb);
			});
		});
	},

	"matchEntry": function (soajs, cb) {
		checkIfMongo(soajs);
		var condition = {
			"firstName": {"$regex": /soajs.inputmaskData.q/},
			"lastName": {"$regex": /soajs.inputmaskData.q/}
		};
		mongo.find(collName, condition, cb);
	}
};