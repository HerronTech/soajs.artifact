'use strict';
var mongo;
var collName = "records";

function checkIfMongo(req) {
	if (!mongo) {
		mongo = req.soajs.mongo(req.soajs.registry.coreDB.myDatabase);
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

	"getEntry": function (config, req, cb) {
		checkIfMongo(req);
		validateId(req.soajs.inputmaskData.id, function (error, id) {
			if (error) {
				return cb(error);
			}

			mongo.findOne(collName, {"id": id}, cb);
		});
	},

	"getEntries": function (config, req, cb) {
		checkIfMongo(req);
		var options = {};
		if (req.soajs.inputmaskData.from && req.soajs.inputmaskData.to) {
			options = {
				start: req.soajs.inputmaskData.from,
				limit: req.soajs.inputmaskData.to
			};
		}
		mongo.find(collName, {}, options, cb);
	},

	"deleteEntry": function (config, req, cb) {
		checkIfMongo(req);
		validateId(req.soajs.inputmaskData.id, function (error, id) {
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

	"addEntry": function (config, req, cb) {
		checkIfMongo(req);
		mongo.insert(collName, req.soajs.inputmaskData.data, cb);
	},

	"updateEntry": function (config, req, cb) {
		checkIfMongo(req);
		validateId(req.soajs.inputmaskData.id, function (error, id) {
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

				var updateRec = req.soajs.inputmaskData.data;
				mongo.update(collName, {"id": id}, updateRec, {"multi": false, "upsert": false, "safe": true}, cb);
			});
		});
	},

	"matchEntry": function (config, req, cb) {
		checkIfMongo(req);
		var condition = {
			"firstName": {"$regex": /req.soajs.inputmaskData.q/ },
			"lastName":{"$regex": /req.soajs.inputmaskData.q/ }
		};
		mongo.find(collName, condition, cb);
	}
};