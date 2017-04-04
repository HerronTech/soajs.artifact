"use strict";
var assert = require('assert');
var shell = require('shelljs');
var utilities = require("soajs.mongodb.data/modules/artifact/");

describe("importing sample data", function () {

	it("do import", function (done) {
		shell.pushd(utilities.dir);
		process.env.SOAJS_PROFILE = utilities.dir + "/profile.js";

		shell.exec("mongo data.js", function (code) {
			assert.equal(code, 0);
			shell.popd();
			done();
		});
	});

	it("Run Tests", function (done) {
		require(__dirname + "/index.js");
		done();
	});
});
