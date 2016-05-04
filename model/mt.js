'use strict';
var soajs = require('soajs');
var Mongo = soajs.mongo;
var mongo;

var dbName = "mtContacts";
var collName = "records";

function checkIfMongo(soajs) {
	var dbRegistry = soajs.meta.tenantDB(soajs.registry.tenantMetaDB, dbName, soajs.tenant.code);
	mongo = new Mongo(dbRegistry);
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
				mongo.closeDb();
				return cb(error);
			}

			mongo.findOne(collName, {"id": id}, function(error, data){
				mongo.closeDb();
				return cb(error, data);
			});
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
		mongo.find(collName, {}, options, function(error, data){
			mongo.closeDb();
			return cb(error, data);
		});
	},

	"deleteEntry": function (soajs, cb) {
		checkIfMongo(soajs);
		validateId(soajs.inputmaskData.id, function (error, id) {
			if (error) {
				mongo.closeDb();
				return cb(error);
			}

			mongo.count(collName, {"id": id}, function (error, count) {
				if (error) {
					mongo.closeDb();
					return cb(error);
				}

				if (!count) {
					mongo.closeDb();
					return cb(new Error("No entry found for id ", id));
				}

				mongo.remove(collName, {"id": id}, function(error, data){
					mongo.closeDb();
					return cb(error, data);
				});
			});
		});
	},

	"addEntry": function (soajs, cb) {
		checkIfMongo(soajs);
		mongo.insert(collName, soajs.inputmaskData.data, function(error, data){
			mongo.closeDb();
			return cb(error, data);
		});
	},

	"updateEntry": function (soajs, cb) {
		checkIfMongo(soajs);
		validateId(soajs.inputmaskData.id, function (error, id) {
			if (error) {
				mongo.closeDb();
				return cb(error);
			}

			mongo.count(collName, {"id": id}, function (error, count) {
				if (error) {
					mongo.closeDb();
					return cb(error);
				}

				if (!count) {
					mongo.closeDb();
					return cb(new Error("No entry found for id ", id));
				}

				var updateRec = soajs.inputmaskData.data;
				mongo.update(collName, {"id": id}, updateRec, {"multi": false, "upsert": false, "safe": true}, function(error, data){
					mongo.closeDb();
					return cb(error, data);
				});
			});
		});
	},

	"matchEntry": function (soajs, cb) {
		checkIfMongo(soajs);
		var condition = {
			"firstName": {"$regex": /soajs.inputmaskData.q/},
			"lastName": {"$regex": /soajs.inputmaskData.q/}
		};
		mongo.find(collName, condition, function(error, data){
			mongo.closeDb();
			return cb(error, data);
		});
	}
};