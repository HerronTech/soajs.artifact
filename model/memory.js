'use strict';
var _ = require("lodash");
var data = require(__dirname + "/../data/index.js");

module.exports = {

	"getEntry": function (soajs, cb) {
		var id = soajs.inputmaskData.id;
		if (!data) {
			return cb(new Error("data object doesn't exist!"));
		}

		if (!data[id]) {
			return cb(null, null);
		}

		return cb(null, data[id]);
	},

	"getEntries": function (soajs, cb) {
		if (!data) {
			return cb(new Error("data object doesn't exist!"));
		}

		var from = soajs.inputmaskData.from;
		var to = soajs.inputmaskData.to;
		var keys = Object.keys(data);

		if (to > keys.length - 1) {
			to = keys.length;
		}
		keys.slice(from, to);

		var output = {};
		keys.forEach(function (oneKey) {
			output[oneKey] = data[oneKey];
		});
		return cb(null, output);
	},

	"deleteEntry": function (soajs, cb) {
		if (!data) {
			return cb(new Error("data object doesn't exist!"));
		}

		var id = soajs.inputmaskData.id;
		if (!data[id]) {
			return cb(new Error("no entry found in data object for id ", id));
		}

		delete data[id];
		return cb(null, true);
	},

	"addEntry": function (soajs, cb) {
		if (!data) {
			data = {};
		}

		if (Array.isArray(soajs.inputmaskData.data)) {
			soajs.inputmaskData.data.forEach(function (oneContact) {
				pushRecord(oneContact);
			});
		}
		else {
			pushRecord(soajs.inputmaskData.data);
		}

		return cb(null, true);

		function pushRecord(oneRecord) {
			var uId = _.uniqueId();
			data[uId] = oneRecord;
		}
	},

	"updateEntry": function (soajs, cb) {
		if (!data) {
			return cb(new Error("data object doesn't exist!"));
		}

		var id = soajs.inputmaskData.id;
		if (!data[id]) {
			return cb(new Error("no entry found in data object for id ", id));
		}
		
		data[id] = soajs.inputmaskData.data;
		return cb(null, true);
	},

	"matchEntry": function (soajs, cb) {
		if (!data) {
			return cb(new Error("data object doesn't exist!"));
		}

		var match = {};
		for (var entryId in data) {
			if (Object.hasOwnProperty.call(data, entryId)) {
				if (
					(soajs.inputmaskData.q.toLowerCase().indexOf(data[entryId].firstName.toLowerCase()) !== -1) ||
					(data[entryId].firstName.toLowerCase().indexOf(soajs.inputmaskData.q.toLowerCase()) !== -1) ||
					(soajs.inputmaskData.q.toLowerCase().indexOf(data[entryId].lastName.toLowerCase()) !== -1) ||
					(data[entryId].lastName.toLowerCase().indexOf(soajs.inputmaskData.q.toLowerCase()) !== -1)
				){
					match[entryId] = data[entryId];
				}
			}
		}

		return cb(null, match);
	}
};